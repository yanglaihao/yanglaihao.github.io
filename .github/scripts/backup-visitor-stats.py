"""Preserve public aggregate totals; probes never increment the replacement counter."""

import argparse
import datetime
import json
import re
import urllib.request
from pathlib import Path

MINIMUM = {"pageViews": 1163, "visitors": 830}
MODERN_STATS_URL = "https://www.busuanzi.cc/count.php?search=yanglaihao.github.io"


def parse_counter_stats(html):
    if "站点 yanglaihao.github.io 的统计信息" not in html:
        raise ValueError("The statistics page is not for the production domain")
    counts = {}
    for key, label in (("pageViews", "站点总访问量"), ("visitors", "站点总访客数")):
        match = re.search(label + r'\s*<e[^>]*>\s*<span>([0-9,]+)</span>', html)
        if not match:
            raise ValueError("The statistics page has no valid aggregate totals")
        counts[key] = int(match[1].replace(",", ""))
    if counts["visitors"] > counts["pageViews"]:
        raise ValueError("Inconsistent upstream totals")
    return counts


def valid_count(value):
    return type(value) is int and 0 <= value <= 9007199254740991


def valid_totals(values):
    return all(valid_count(values.get(key)) and values[key] >= floor for key, floor in MINIMUM.items()) and values["visitors"] <= values["pageViews"]


def capture_legacy(baseline, original, now):
    if baseline.get("legacyRecovery", {}).get("status") == "captured":
        return
    if not all(valid_count(original.get(key)) for key in ("site_pv", "site_uv")):
        return
    if original["site_pv"] < baseline["pageViews"] + 1 or original["site_uv"] < baseline["visitors"]:
        return
    if original["site_uv"] > original["site_pv"]:
        return
    # The migration probe adds a page view and may add a visitor. Keep the
    # verified cache minimum, and retain the raw response for reconciliation.
    baseline["pageViews"] = max(baseline["pageViews"], original["site_pv"] - 1)
    baseline["visitors"] = max(baseline["visitors"], original["site_uv"] - 1)
    baseline["legacyRecovery"] = {"status": "captured", "capturedAt": now, "response": original}


def update_snapshot(baseline, counts, now):
    if baseline.get("status") != "recovered" or not valid_totals(baseline):
        raise ValueError("Refusing to replace the verified historical totals with an invalid baseline")
    snapshot = baseline.get("snapshot", {}).copy()
    if not valid_totals(snapshot):
        snapshot = {key: baseline[key] for key in MINIMUM}
    offsets = baseline.setdefault("counterOffsets", {key: 0 for key in MINIMUM})
    checkpoint = baseline.setdefault("counterCheckpoint", {key: None for key in MINIMUM})
    changed = False
    for key in MINIMUM:
        count = counts.get(key)
        if not valid_count(count):
            continue
        previous = checkpoint.get(key)
        offset = offsets.get(key, 0)
        if not valid_count(offset):
            raise ValueError("Invalid saved counter offset")
        if valid_count(previous) and count < previous:
            # A stale response or reset is not evidence of new visits. Keep
            # the last verified count instead of inventing a restart offset.
            continue
        total = baseline[key] + offset + count
        if not valid_count(total):
            continue
        if total != snapshot[key] or previous != count:
            changed = True
        snapshot[key] = max(snapshot[key], total)
        checkpoint[key] = count
    for key in MINIMUM:
        if snapshot[key] < baseline[key]:
            snapshot[key] = baseline[key]
            changed = True
    if not valid_totals(snapshot):
        raise ValueError("Refusing inconsistent page-view and visitor totals")
    if changed:
        snapshot["updatedAt"] = now
    baseline["snapshot"] = snapshot
    return baseline


def update_html(html, baseline):
    snapshot = baseline["snapshot"]
    attributes = {
        "data-baseline-page-views": baseline["pageViews"],
        "data-baseline-visitors": baseline["visitors"],
        "data-counter-offset-page-views": baseline["counterOffsets"]["pageViews"],
        "data-counter-offset-visitors": baseline["counterOffsets"]["visitors"],
        "data-counter-start-page-views": baseline["counterStart"]["pageViews"],
        "data-counter-start-visitors": baseline["counterStart"]["visitors"],
        "data-snapshot-page-views": snapshot["pageViews"],
        "data-snapshot-visitors": snapshot["visitors"],
        "data-snapshot-updated-at": snapshot["updatedAt"],
    }

    def replace_tag(match):
        tag = match.group(0)
        for key, value in attributes.items():
            attribute = f'{key}="{value}"'
            pattern = rf'\b{re.escape(key)}="[^"]*"'
            tag = re.sub(pattern, attribute, tag) if re.search(pattern, tag) else tag[:-1] + " " + attribute + ">"
        return tag

    html, count = re.subn(r'<div class="visitor-stats"[^>]*>', replace_tag, html)
    if count != 1:
        raise ValueError("Visitor statistics container is missing or duplicated")
    for element, key in (("busuanzi_value_site_pv", "pageViews"), ("busuanzi_value_site_uv", "visitors")):
        pattern = rf'(<em id="{element}">)[^<]*(</em>)'
        html, count = re.subn(pattern, lambda match: match[1] + f'{snapshot[key]:,}' + match[2], html)
        if count != 1:
            raise ValueError("A visitor statistics field is missing or duplicated")
    return html


def request_text(url, headers=None):
    request = urllib.request.Request(url, headers=headers or {"User-Agent": "SiteCounterBackup/1.0"})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read(65536).decode("utf-8")


def read_counter_stats(baseline):
    try:
        raw = parse_counter_stats(request_text(MODERN_STATS_URL))
        start = baseline["counterStart"]
        if not all(valid_count(start[key]) and raw[key] >= start[key] for key in MINIMUM):
            raise ValueError("Upstream totals are below the verified deployment checkpoint")
        return {key: raw[key] - start[key] for key in MINIMUM}
    except (OSError, ValueError) as error:
        print(f"Live statistics unavailable ({type(error).__name__}); preserving saved totals.")
        return {}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    args = parser.parse_args()
    baseline_path = args.root / "visitor-baseline.json"
    baseline = json.loads(baseline_path.read_text(encoding="utf-8"))
    if not valid_totals(baseline):
        raise ValueError("Historical baseline is invalid")
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    counts = read_counter_stats(baseline)
    if baseline.get("legacyRecovery", {}).get("status") != "captured":
        try:
            text = request_text(
                "https://busuanzi.ibruce.info/busuanzi?jsonpCallback=RecoverHistoricalVisitorStats",
                {"Referer": "https://yanglaihao.github.io/", "User-Agent": "Mozilla/5.0"},
            )
            match = re.search(r'RecoverHistoricalVisitorStats\((\{.*?\})\)', text)
            if match:
                capture_legacy(baseline, json.loads(match[1]), now)
        except (OSError, ValueError) as error:
            print(f"Original service unavailable ({type(error).__name__}); retaining cache evidence and retrying later.")
    update_snapshot(baseline, counts, now)
    html_path = args.root / "index.html"
    html = update_html(html_path.read_text(encoding="utf-8"), baseline)
    baseline_path.write_text(json.dumps(baseline, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    html_path.write_text(html, encoding="utf-8")
    print(f'Saved totals: {baseline["snapshot"]["pageViews"]} page views, {baseline["snapshot"]["visitors"]} visitors.')


if __name__ == "__main__":
    main()

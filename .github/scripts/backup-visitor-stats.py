"""Preserve public aggregate totals; probes never increment the replacement counter."""

import argparse
import concurrent.futures
import datetime
import json
import re
import urllib.request
from pathlib import Path

MINIMUM = {"pageViews": 1163, "visitors": 830}
COUNTERS = {
    "pageViews": "https://counterapi.com/api/yanglaihao.github.io/recovered-pageview-20261004/site?readOnly=true",
    "visitors": "https://counterapi.com/api/yanglaihao.github.io/recovered-visitor-20261004/site?unique=true&readOnly=true",
}


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
            # Resume above the durable total if the provider loses its counter.
            offset = max(offset + previous, snapshot[key] - baseline[key], 0)
            offsets[key] = offset
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


def read_counter(item):
    key, url = item
    try:
        return key, json.loads(request_text(url)).get("value")
    except (OSError, ValueError) as error:
        print(f"{key}: live service unavailable ({type(error).__name__}); preserving saved totals.")
        return key, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    args = parser.parse_args()
    baseline_path = args.root / "visitor-baseline.json"
    baseline = json.loads(baseline_path.read_text(encoding="utf-8"))
    if not valid_totals(baseline):
        raise ValueError("Historical baseline is invalid")
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        counts = dict(pool.map(read_counter, COUNTERS.items()))
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

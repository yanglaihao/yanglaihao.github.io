import copy
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("visitor_backup", ROOT / ".github/scripts/backup-visitor-stats.py")
backup = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backup)
original = json.loads((ROOT / "visitor-baseline.json").read_text())
now = "2026-10-04T04:00:00Z"

# Start each simulation at the evidenced history, independent of future backups.
fixture = copy.deepcopy(original)
fixture.update(pageViews=1163, visitors=830, legacyRecovery={"status": "pending"}, counterOffsets={"pageViews": 0, "visitors": 0}, counterCheckpoint={"pageViews": None, "visitors": None}, snapshot={"pageViews": 1163, "visitors": 830, "updatedAt": fixture["historicalSnapshotAt"]})
baseline = backup.update_snapshot(copy.deepcopy(fixture), {"pageViews": 12, "visitors": 3}, now)
assert baseline["snapshot"]["pageViews"] == 1175
assert baseline["snapshot"]["visitors"] == 833
unavailable = backup.update_snapshot(copy.deepcopy(baseline), {"pageViews": None, "visitors": None}, now)
assert unavailable == baseline, "an outage must preserve the complete durable backup"

reset = backup.update_snapshot(copy.deepcopy(baseline), {"pageViews": 1, "visitors": 1}, now)
assert reset["snapshot"]["pageViews"] == 1176, "a reset must resume above the saved page-view count"
assert reset["snapshot"]["visitors"] == 834
continued = backup.update_snapshot(reset, {"pageViews": 2, "visitors": 1}, now)
assert continued["snapshot"]["pageViews"] == 1177
assert continued["snapshot"]["visitors"] == 834, "repeated visitors must not increment the unique total"

invalid = backup.update_snapshot(copy.deepcopy(baseline), {"pageViews": False, "visitors": "9"}, now)
assert invalid == baseline
history = copy.deepcopy(fixture)
backup.capture_legacy(history, {"site_pv": 1, "site_uv": 1}, now)
assert history == fixture, "a reset or wrong-site response must not replace the original data"
backup.capture_legacy(history, {"site_pv": 1181, "site_uv": 841}, now)
assert history["pageViews"] == 1180 and history["visitors"] == 840
backup.capture_legacy(history, {"site_pv": 1182, "site_uv": 842}, now)
assert history["pageViews"] == 1180, "repeated recovery probes must not be counted as visits"

html = backup.update_html((ROOT / "index.html").read_text(), baseline)
assert '<em id="busuanzi_value_site_pv">1,175</em>' in html
assert '<em id="busuanzi_value_site_uv">833</em>' in html
assert 'data-snapshot-page-views="1175"' in html
assert backup.update_html(html, baseline) == html, "saving the same totals must be idempotent"
print("Visitor backup and recovery checks passed.")

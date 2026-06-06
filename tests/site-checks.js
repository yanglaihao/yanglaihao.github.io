const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function matchAll(pattern, source = html) {
  return Array.from(source.matchAll(pattern));
}

const researchVideos = matchAll(/<figure class="research-media">\s*<video([^>]*)>[\s\S]*?<source src="([^"]+)"/g).map((match) => ({
  attrs: match[1],
  src: match[2],
}));
assert.equal(researchVideos.length, 3, "all three research panels should use playable videos");
for (const video of researchVideos) {
  assert.equal(path.extname(video.src).toLowerCase(), ".mp4", "research videos should be MP4");
  assert.ok(video.attrs.includes("controls"), "research videos should expose playback controls");
}

const memberCategoryButtons = matchAll(/data-member-target="([^"]+)"/g);
assert.ok(memberCategoryButtons.length >= 7, "member categories should be rendered as collapsible buttons");
assert.ok(html.includes('data-member-panel="leader"'), "leader panel should be collapsible");
assert.ok(html.includes('data-member-panel="phd"'), "PhD member panel should be collapsible");
assert.ok(html.includes('data-member-panel="master"'), "master member panel should be collapsible");
assert.ok(script.includes("showMemberPanel"), "script should switch member panels");
assert.ok(script.includes("showOutputCategory"), "script should switch achievement categories");

for (const filter of ["paper-sci", "paper-ei-journal", "paper-ei-conference", "paper-preprint"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing publication filter: ${filter}`);
  assert.ok(html.includes(`data-output-type="${filter}"`), `missing publication items for: ${filter}`);
}

for (const filter of ["paper", "patent", "book", "award"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing achievement board filter: ${filter}`);
}
assert.ok(html.includes("achievement-overview"), "achievement section should include a summary overview");
assert.ok(html.includes("data-paper-subfilters"), "paper section should include clickable secondary categories");

const publicationCount = matchAll(/<article class="achievement" data-output-type="paper-/g).length;
assert.equal(publicationCount, 94, `expected 94 classified representative publications from public profiles, found ${publicationCount}`);
assert.ok(!styles.includes("embodied-focus"), "research directions should use video assets directly");

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

const researchImages = matchAll(/<figure class="research-media">\s*<img src="([^"]+)"/g).map((match) => match[1]);
assert.deepEqual(
  researchImages.map((src) => path.extname(src).toLowerCase()),
  [".gif", ".gif", ".gif"],
  "all three research panels should use GIF assets",
);

const memberCategoryButtons = matchAll(/data-member-target="([^"]+)"/g);
assert.ok(memberCategoryButtons.length >= 6, "member categories should be rendered as collapsible buttons");
assert.ok(html.includes('data-member-panel="phd"'), "PhD member panel should be collapsible");
assert.ok(html.includes('data-member-panel="master"'), "master member panel should be collapsible");
assert.ok(script.includes("showMemberPanel"), "script should switch member panels");

for (const filter of ["paper-sci", "paper-ei-journal", "paper-ei-conference", "paper-preprint"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing publication filter: ${filter}`);
  assert.ok(html.includes(`data-output-type="${filter}"`), `missing publication items for: ${filter}`);
}

const publicationCount = matchAll(/<article class="achievement" data-output-type="paper-/g).length;
assert.equal(publicationCount, 60, `expected 60 classified representative publications from public profiles, found ${publicationCount}`);
assert.ok(!styles.includes("embodied-focus"), "embodied research direction should use the GIF asset directly");

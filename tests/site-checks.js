const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const handoff = fs.readFileSync(path.join(root, "HANDOFF.md"), "utf8");

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

for (const filter of ["paper", "project", "patent", "book", "award", "service"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing achievement board filter: ${filter}`);
}
const primaryFilterOrder = matchAll(/class="filter(?: active)?" type="button" role="tab" aria-selected="(?:true|false)" data-output-filter="([^"]+)"/g).map((match) => match[1]);
assert.equal(primaryFilterOrder[0], "project", "project should be the first achievement category");
assert.ok(script.includes('showOutputCategory("project")'), "project should be the default achievement view");
assert.ok(html.includes("achievement-overview"), "achievement section should include a summary overview");
assert.ok(html.includes("data-paper-subfilters"), "paper section should include clickable secondary categories");
assert.ok(html.includes("data-patent-subfilters"), "patent section should include clickable secondary categories");
assert.ok(html.includes("data-award-subfilters"), "award section should include clickable secondary categories");

for (const filter of ["patent-international", "patent-china"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing patent filter: ${filter}`);
  assert.ok(html.includes(`data-output-type="${filter}"`), `missing patent items for: ${filter}`);
}
assert.ok(html.includes("国际专利"), "patent section should include an international patent heading");
assert.ok(html.includes("中国专利"), "patent section should include a Chinese patent heading");

const chinesePatentCount = matchAll(/<article class="achievement" data-output-type="patent-china">/g).length;
const internationalPatentCount = matchAll(/<article class="achievement" data-output-type="patent-international">/g).length;
assert.equal(internationalPatentCount, 8, `expected 8 international patent records from the saved Google Patents page, found ${internationalPatentCount}`);
assert.equal(chinesePatentCount, 96, `expected 96 deduplicated Chinese patent records from the saved CNKI pages, found ${chinesePatentCount}`);
assert.equal(matchAll(/class="status-tag status-granted"/g).length, 55, "patent status tags should mark 55 granted records");
assert.equal(matchAll(/class="status-tag status-published"/g).length, 49, "patent status tags should mark 49 published records");
assert.ok(html.includes("US12370671B2"), "international patent list should include Google Patents granted records");
assert.ok(html.includes("US20260072429A1"), "international patent list should include current Google Patents published records");
assert.ok(html.includes("CN116968041B"), "Chinese patent list should include CNKI granted records");
assert.ok(html.includes("CN122087890A"), "Chinese patent list should include CNKI published records");
assert.ok(html.includes("CN118907257B"), "Chinese patent list should include records from the additional saved CNKI pages");
assert.ok(html.includes("CN110608710B"), "Chinese patent list should include older granted records from the additional saved CNKI pages");
assert.ok(html.includes("航空发动机进气道叶片检测机器人及检测方法"), "Chinese patent list should include current CNKI page items");
assert.ok(!html.includes("CN119334645A"), "Chinese patent list should drop published records when a granted record exists");
assert.ok(!html.includes("CN120134362A"), "Chinese patent list should keep only the granted version for duplicate patent families");
assert.ok(!html.includes("访问受限"), "patent section should not keep the old access-limited placeholder");
const pre2025ChinesePatents = matchAll(/<article class="achievement" data-output-type="patent-china">([\s\S]*?)<\/article>/g)
  .map((match) => match[1])
  .map((article) => ({
    year: Number(article.match(/<div class="pub-year">(\d+)<\/div>/)?.[1]),
    title: article.match(/<h3>([\s\S]*?)<\/h3>/)?.[1],
  }))
  .filter((patent) => patent.year < 2025);
assert.equal(pre2025ChinesePatents.length, 53, `expected 53 Chinese patent records before 2025, found ${pre2025ChinesePatents.length}`);
for (const patent of pre2025ChinesePatents) {
  assert.ok(script.includes(`"${patent.title}"`), `English mode should directly translate pre-2025 Chinese patent title: ${patent.title}`);
}
assert.ok(script.includes("function translatePatentMetadata"), "English mode should translate structured Chinese patent metadata instead of falling back to placeholders");

for (const filter of ["award-tech", "award-paper", "award-student", "award-social", "award-thesis"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing award filter: ${filter}`);
  assert.ok(html.includes(`data-output-type="${filter}"`), `missing award items for: ${filter}`);
}

const projectCount = matchAll(/<article class="achievement" data-output-type="project">/g).length;
assert.equal(projectCount, 18, `expected 18 projects from the public profile, found ${projectCount}`);

const awardCount = matchAll(/<article class="achievement" data-output-type="award-/g).length;
assert.equal(awardCount, 18, `expected 18 categorized awards after adding the Taihang Cup item, found ${awardCount}`);
assert.ok(html.includes("首届“太行杯”航空动力创新大赛优胜奖"), "student competition awards should include the first Taihang Cup aviation power innovation award");
assert.ok(html.includes('<div class="pub-year">2026</div>\n            <div class="pub-body">\n              <p class="pub-venue">学生竞赛获奖</p>\n              <h3>首届“太行杯”航空动力创新大赛优胜奖</h3>'), "Taihang Cup award should use the 2026 award year format");

const serviceCount = matchAll(/<article class="achievement" data-output-type="service">/g).length;
assert.equal(serviceCount, 11, `expected 11 social service entries from the public profile, found ${serviceCount}`);

assert.ok(html.includes("学术型博士（1-2人/年）"), "Sun Yu mentor card should include PhD enrollment direction details");
assert.ok(!html.includes("学硕型硕士"), "Sun Yu mentor card should normalize the master's enrollment label");
assert.ok(html.includes("航空发动机与航天器先进传感及健康管理"), "Sun Yu mentor card should include detailed recruitment directions");
assert.ok(html.includes("data-language-toggle"), "home page should include a Chinese/English language toggle");
assert.ok(html.includes("data-i18n=\"nav.home\""), "key navigation text should be language-switchable");
assert.ok(script.includes("applyLanguage"), "script should implement language switching");
assert.ok(script.includes("textTranslations"), "language switching should include full-page static text translations");
assert.ok(script.includes("translateStaticText"), "language switching should translate non-navigation page text");
assert.ok(script.includes('language === "en" ? "ZH" : "EN"'), "English mode language toggle should avoid Chinese text");
assert.ok(handoff.includes("项目、论文、专利、专著、获奖、社会任职"), "handoff should describe the updated achievement categories");
assert.ok(handoff.includes("孙瑜"), "handoff should mention the added Sun Yu mentor entry");
assert.ok(handoff.includes("中英文切换"), "handoff should mention the language toggle");

assert.ok(html.includes("团队关于触觉传感和灵巧操作的研究工作发表于Science 子刊"), "news should include current profile news from the school site");
assert.ok(html.includes("https://faculty.xjtu.edu.cn/content.jsp?urltype=news.NewsContentUrl"), "news should retain source links");
assert.ok(html.includes('data-news-filter="notice"'), "news section should include a notice filter");
assert.equal(matchAll(/<article class="news-card" data-news-type="news">/g).length, 10, "news section should include 10 current news items");
assert.equal(matchAll(/<article class="news-card" data-news-type="notice">/g).length, 4, "news section should include 4 notice items");
assert.ok(html.includes("杨来浩副研究员获首届“太行杯”航空动力创新大赛优胜奖"), "news should include the latest Taihang Cup item from Yang Laihao's profile");
assert.ok(html.includes("https://gr.xjtu.edu.cn/yanglaihao/zh_CN/article/316893/content/35392.htm#article"), "Yang Laihao news links should be absolute");
assert.ok(html.includes("欢迎新同学加入课题组"), "notices should include Sun Yu group updates");
assert.ok(html.includes("https://faculty.xjtu.edu.cn/yu.sun/zh_CN/article/332021/content/23747.htm#article"), "Sun Yu news links should be absolute");
assert.ok(script.includes('"通知": "Notices"'), "English mode should translate the notice filter");
assert.ok(script.includes('"杨来浩副研究员获首届“太行杯”航空动力创新大赛优胜奖"'), "English mode should translate the latest news titles");
assert.ok(script.includes('"欢迎新同学加入课题组"'), "English mode should translate notice titles");
assert.ok(!html.includes("个人主页 Awards 页面公开信息"), "award source boilerplate should be removed");
assert.ok(!html.includes("个人主页 Academic 页面公开信息"), "service source boilerplate should be removed");
assert.ok(!html.includes("以上信息根据孙瑜老师学校主页招生信息整理"), "teacher notes should be removed from the member panel");
assert.ok(html.includes("https://faculty.xjtu.edu.cn/yu.sun/zh_CN/index.htm"), "Sun Yu card should link to her profile");
assert.ok(html.includes("assets/site-qr.svg"), "contact area should reference the team site QR code");
assert.ok(html.includes('src="assets/team-profile.jpg"'), "hero image should keep a direct asset fallback for non-Netlify hosts");
assert.ok(!html.includes("/.netlify/images?url="), "GitHub Pages deployment should not depend on Netlify Image CDN URLs");
assert.ok(html.includes("busuanzi_value_site_pv"), "footer should expose site page-view statistics");
assert.ok(html.includes("busuanzi_value_site_uv"), "footer should expose site visitor statistics");
assert.ok(html.includes("busuanzi.pure.mini.js"), "static site should load the Busuanzi counter script");
assert.ok(script.includes("attributeTranslations"), "language switching should translate important accessibility attributes and metadata");
assert.ok(script.includes("translateAttributes"), "language switching should update image alt text and aria labels");
assert.ok(script.includes('"meta.description"'), "English mode should translate the page meta description");
assert.ok(script.includes('"航空发动机进气道叶片检测机器人及检测方法"'), "English mode should translate representative Chinese patent titles directly");
assert.ok(script.includes('"首届“太行杯”航空动力创新大赛优胜奖"'), "English mode should translate the Taihang Cup award directly");

const publicationCount = matchAll(/<article class="achievement" data-output-type="paper-/g).length;
assert.equal(publicationCount, 94, `expected 94 classified representative publications from public profiles, found ${publicationCount}`);
assert.ok(!styles.includes("embodied-focus"), "research directions should use video assets directly");

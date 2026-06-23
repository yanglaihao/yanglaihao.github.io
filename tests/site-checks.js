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

function memberPanelHtml(panel) {
  return html.match(new RegExp(`<article class="member-category"[^>]*data-member-panel="${panel}"[\\s\\S]*?</article>`))?.[0] || "";
}

function assertDescending(values, label) {
  for (let index = 1; index < values.length; index += 1) {
    assert.ok(
      values[index - 1] >= values[index],
      `${label} should be sorted newest first, but ${values[index - 1]} appears before ${values[index]}`
    );
  }
}

function orderIndex(source, snippets, label) {
  const indices = snippets.map((snippet) => {
    const index = source.indexOf(snippet);
    assert.notEqual(index, -1, `${label} should include ${snippet}`);
    return index;
  });
  assertDescending(indices.map((index) => -index), label);
}

function achievementYearsFor(predicate) {
  return matchAll(/<article class="achievement(?: [^"]*)?" data-output-type="([^"]+)">([\s\S]*?)<\/article>/g)
    .filter((match) => predicate(match[1], match[2]))
    .map((match) => Number(match[2].match(/<div class="pub-year">(\d+)<\/div>/)?.[1]));
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
const allVideoTags = matchAll(/<video([^>]*)>/g).map((match) => match[1]);
assert.equal(allVideoTags.length, 9, "site should keep the expected 9 local videos");
for (const attrs of allVideoTags) {
  assert.ok(attrs.includes('controlslist="nodownload"'), "videos should hide the browser download control");
  assert.ok(attrs.includes('oncontextmenu="return false"'), "videos should disable the default right-click download menu");
}

const memberCategoryButtons = matchAll(/data-member-target="([^"]+)"/g);
assert.equal(memberCategoryButtons.length, 7, "member categories should use the existing seven collapsible groups");
assert.ok(html.includes('data-member-panel="leader"'), "leader panel should be collapsible");
assert.ok(!html.includes('data-member-panel="sun-team"'), "Sun Yu students should not create a separate collapsible panel");
assert.ok(html.includes('data-member-panel="phd"'), "PhD member panel should be collapsible");
assert.ok(html.includes('data-member-panel="master"'), "master member panel should be collapsible");
assert.ok(script.includes("showMemberPanel"), "script should switch member panels");
assert.ok(script.includes("showOutputCategory"), "script should switch achievement categories");

for (const filter of ["paper-sci", "paper-ei-journal", "paper-ei-conference", "paper-preprint"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing publication filter: ${filter}`);
  assert.ok(html.includes(`data-output-type="${filter}"`), `missing publication items for: ${filter}`);
}

for (const filter of ["highlight-output", "paper", "project", "patent", "book", "award", "service"]) {
  assert.ok(html.includes(`data-output-filter="${filter}"`), `missing achievement board filter: ${filter}`);
}
const primaryFilterOrder = matchAll(/class="filter(?: active)?" type="button" role="tab" aria-selected="(?:true|false)" data-output-filter="([^"]+)"/g).map((match) => match[1]);
assert.equal(primaryFilterOrder[0], "highlight-output", "highlight outputs should be the first achievement category");
assert.equal(primaryFilterOrder[1], "project", "project should follow highlight outputs");
assert.ok(script.includes('showOutputCategory("highlight-output")'), "highlight outputs should be the default achievement view");
assert.ok(html.includes("achievement-overview"), "achievement section should include a summary overview");
assert.ok(html.includes("data-paper-subfilters"), "paper section should include clickable secondary categories");
assert.ok(html.includes("data-patent-subfilters"), "patent section should include clickable secondary categories");
assert.ok(html.includes("data-award-subfilters"), "award section should include clickable secondary categories");

const highlightOutputBlocks = matchAll(/<article class="achievement achievement-featured-output" data-output-type="highlight-output">([\s\S]*?)<\/article>/g).map((match) => match[1]);
assert.equal(highlightOutputBlocks.length, 3, "achievement section should include 3 featured outputs");
assert.deepEqual(
  highlightOutputBlocks.map((block) => block.match(/ · (20\d{2})<\/p>/)?.[1]),
  ["2026", "2024", "2024"],
  "featured outputs should be sorted newest first"
);
for (const video of [
  "assets/paper-highlights/contact-aided-continuum.mp4",
  "assets/paper-highlights/torque-dexterity.mp4",
  "assets/paper-highlights/bistable-jumper.mp4",
]) {
  assert.ok(html.includes(video), `featured outputs should embed local paper video: ${video}`);
}
for (const doi of [
  "https://doi.org/10.1109/TRO.2024.3400944",
  "https://doi.org/10.1126/sciadv.aec3263",
  "https://doi.org/10.1002/advs.202404404",
]) {
  assert.ok(html.includes(doi), `featured outputs should link to paper DOI: ${doi}`);
}
for (const title of [
  "A Novel Contact-Aided Continuum Robotic System: Design, Modeling, and Validation",
  "Touching with torque enables human-level robotic dexterity",
  "Bistable Insect-Scale Jumpers with Tunable Energy Barriers for Multimodal Locomotion",
]) {
  assert.ok(html.includes(title), `featured outputs should include paper title: ${title}`);
  assert.ok(script.includes(`"${title}"`), `English mode should preserve/translate featured output title: ${title}`);
}
assert.ok(html.includes("接触辅助连续体机器人面向航空发动机等受限深腔"), "featured output should briefly introduce the contact-aided continuum robot work");
assert.ok(html.includes("扭矩触觉让机器人达到接近人类水平的灵巧操作"), "featured output should briefly introduce the torque tactile dexterity work");
assert.ok(html.includes("可调能垒双稳态跳跃机器人实现昆虫尺度多模态运动"), "featured output should briefly introduce the bistable jumper work");
assert.ok(script.includes('"亮点成果": "Featured Outputs"'), "English mode should translate the featured outputs filter");

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
const internationalPatentBlocks = matchAll(/<article class="achievement" data-output-type="patent-international">([\s\S]*?)<\/article>/g).map((match) => match[1]);
const internationalPublishedBlocks = internationalPatentBlocks.filter((block) => block.includes("status-published"));
const internationalGrantedBlocks = internationalPatentBlocks.filter((block) => block.includes("status-granted"));
assert.equal(internationalPublishedBlocks.length, 2, "only the two 2026 international patents should remain published");
assert.ok(internationalPublishedBlocks.every((block) => block.includes('<div class="pub-year">2026</div>')), "published international patents should be the two 2026 records");
assert.equal(internationalGrantedBlocks.length, 6, "all international patents before 2026 should be marked granted");
assert.equal(matchAll(/class="status-tag status-granted"/g).length, 58, "patent status tags should mark 58 granted records");
assert.equal(matchAll(/class="status-tag status-published"/g).length, 46, "patent status tags should mark 46 published records");
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
assertDescending(achievementYearsFor((type) => type === "project"), "projects");

const awardCount = matchAll(/<article class="achievement" data-output-type="award-/g).length;
assert.equal(awardCount, 18, `expected 18 categorized awards after adding the Taihang Cup item, found ${awardCount}`);
assert.ok(html.includes("首届“太行杯”航空动力创新大赛优胜奖"), "student competition awards should include the first Taihang Cup aviation power innovation award");
assert.ok(html.includes('<div class="pub-year">2026</div>\n            <div class="pub-body">\n              <p class="pub-venue">学生竞赛获奖</p>\n              <h3>首届“太行杯”航空动力创新大赛优胜奖</h3>'), "Taihang Cup award should use the 2026 award year format");
assertDescending(achievementYearsFor((type) => type.startsWith("award-")), "awards");
assertDescending(achievementYearsFor((type) => type === "award-student"), "student awards");

const serviceCount = matchAll(/<article class="achievement" data-output-type="service">/g).length;
assert.equal(serviceCount, 11, `expected 11 social service entries from the public profile, found ${serviceCount}`);
assertDescending(achievementYearsFor((type) => type === "service"), "service entries");

assert.ok(html.includes("学术型博士（1-2人/年）"), "Sun Yu mentor card should include PhD enrollment direction details");
assert.ok(!html.includes("学硕型硕士"), "Sun Yu mentor card should normalize the master's enrollment label");
assert.ok(html.includes("航空发动机与航天器先进传感及健康管理"), "Sun Yu mentor card should include detailed recruitment directions");
assert.ok(html.includes("非攻机器人实验室"), "site should use the updated Feigong Robotics Laboratory name");
assert.ok(script.includes('"非攻机器人实验室": "Feigong Robotics Laboratory"'), "English mode should translate the updated laboratory name");
assert.ok(html.includes("取“非攻”一器多形之巧，造因境而变、入微而作的具身智能机器人"), "about section should present Feigong as an embodied intelligence robotics concept");
assert.ok(!html.includes("取“非攻”一器多形之巧，造因境而变、入微而作的智能检修机器人"), "about section should no longer use intelligent maintenance robots in the Feigong concept sentence");
for (const keyword of ["软体/连续体机器人", "爬行机器人", "具身智能", "灵巧操作", "触觉传感"]) {
  assert.ok(html.includes(`<span data-i18n="hero.meta.`) && html.includes(`>${keyword}</span>`), `hero keyword list should include ${keyword}`);
}
for (const oldKeyword of ["智能诊断", "原位介入", "具身操作"]) {
  assert.ok(!html.includes(`>${oldKeyword}</span>`), `hero keyword list should no longer include ${oldKeyword}`);
}
const aboutSection = html.match(/<section class="section" id="about"[\s\S]*?<\/section>/)?.[0] || "";
assert.ok(!aboutSection.includes("依托西安交通大学机械工程学院和航空发动机研究所"), "about intro should not state the supporting units");
assert.ok(!html.includes("百度百科《非攻》词条"), "intro should not mention a concrete dictionary entry source");
assert.ok(!html.includes("https://baike.baidu.com/item/%E9%9D%9E%E6%94%BB/4792002"), "intro should not expose a source link for the lab concept");
assert.ok(!html.includes("名称来源"), "about cards should not include a source-note card");
assert.ok(html.includes("一器多形、因境而变、入微而作"), "about section should map Feigong to mechanism and robotics traits");
assert.ok(!html.includes("墨子思想"), "Feigong source should not be described as Mozi's non-attack doctrine");
assert.ok(!html.includes("墨家“非攻”"), "Feigong source should not be described as the Mohist non-attack doctrine");
assert.ok(!html.includes("墨家反对无谓攻伐"), "hero copy should not use the Mohist non-attack explanation");
assert.ok(!script.includes("墨家反对无谓攻伐"), "translation table should not retain the old Mohist source wording");
assert.ok(html.includes("以尽量少拆解、少损伤、少停机的方式完成高端装备在位诊断、进入和维护。"), "mission should connect Feigong to non-invasive equipment maintenance");
assert.ok(!html.includes('data-member-panel="sun-team"'), "Sun Yu students should be merged into existing member groups, not a separate team panel");
assert.ok(!html.includes("孙瑜团队"), "member tabs should not create a separate Sun Yu team group");
assert.ok(!html.includes("以下名单根据学校教师主页公开成员信息整理"), "member intro should not show source-explanation text");
assert.ok(!html.includes("来源：孙瑜老师主页学生信息"), "member panel should not show visible source-explanation buttons");
assert.ok(!html.includes("来源：孙瑜老师主页桃李天下"), "alumni panel should not show visible source-explanation buttons");
const phdPanel = memberPanelHtml("phd");
const masterPanel = memberPanelHtml("master");
orderIndex(phdPanel, ["杜祖鹏", "胡华辉", "杨浙帅", "金若尘"], "PhD students with cohort years");
orderIndex(masterPanel, ["张亚鹏", "李昊钢", "李晨铭", "钱行健", "王怡博", "薛晨菲", "姚晨彧"], "master's students with cohort years");
for (const item of [
  "郭庆凯 · 软体驱动方向",
  "汪领 · 触觉传感方向",
  "梁浩峰 · 粘附设计方向",
  "王韵博 · 爬壁机器人方向",
]) {
  assert.ok(html.includes(item), `Sun Yu current PhD students should include ${item}`);
  assert.ok(phdPanel.includes(item), `${item} should be merged into the PhD student group`);
  assert.ok(!masterPanel.includes(item), `${item} should not remain in the master's student group`);
}
for (const item of [
  "任亨 · 结构设计方向",
  "谢时雨 · 软体驱动方向",
  "赵子攀 · 软体驱动方向",
  "贾秀梅 · 智能运维方向",
  "侯传鑫 · 触觉传感方向",
  "李昊阳 · 灵巧手方向",
  "杨建傲 · 触觉传感方向",
  "唐骏元 · 软体驱动方向",
]) {
  assert.ok(html.includes(item), `Sun Yu current students should include ${item}`);
  assert.ok(masterPanel.includes(item), `${item} should be merged into the master's student group`);
}
for (const note of ["金点子选手", "行动力达人", "求知欲满满", "控制硬件担当", "结构设计与系统思维", "软体驱动与系统实验", "软体驱动与实验验证", "智能运维与细致实验", "触觉硬件与论文研读", "灵巧操作与机器人手系统", "触觉感知与传感器系统", "软体驱动与机器人机构"]) {
  assert.ok(!html.includes(note), `student profile should omit personality-style note: ${note}`);
}
assert.ok(!html.includes("孙瑜老师团队已毕业学生"), "Sun Yu alumni should be merged into the existing alumni group, not a separate subheading");
for (const item of [
  "王昊 · 硕士 · 2019级 · 中铁第一勘察设计院集团有限公司",
  "赵州 · 硕士 · 2020级 · 香港城市大学（攻读博士）",
  "张天祥 · 硕士 · 2022级 · 比亚迪汽车有限公司",
]) {
  assert.ok(html.includes(item), `Sun Yu alumni should include ${item}`);
}
assert.ok(!html.includes("王景 · 硕士 · 2021级 · 航空工业第一飞机设计研究院"), "duplicate Wang Jing alumni entry from the new source should be removed");
assert.ok(!html.includes("刘乙雪 · 硕士 · 2022级 · 比亚迪汽车有限公司"), "duplicate Liu Yixue alumni entry from the new source should be removed");
assert.ok(html.includes("2024 · 硕士论文：基于非接触测量的航空发动机转子叶片在线监测研究 · 毕业去向：一飞院"), "existing Wang Jing alumni entry should be retained");
assert.ok(html.includes("2025 · 硕士论文：折纸启发的磁性薄膜多维力触觉电子皮肤 · 毕业去向：比亚迪"), "existing Liu Yixue alumni entry should be retained");
const alumniPanel = memberPanelHtml("alumni");
orderIndex(
  alumniPanel,
  ["刘乙雪", "杨冬", "兰雨", "庞丁", "吕宇欣", "赵州", "王昊"],
  "alumni entries"
);
assert.ok(script.includes('"郭庆凯 · 软体驱动方向": "Qingkai Guo · Soft actuation"'), "English mode should translate Sun Yu current student entries");
assert.ok(script.includes('"王昊 · 硕士 · 2019级 · 中铁第一勘察设计院集团有限公司"'), "English mode should translate Sun Yu alumni entries");
assert.ok(script.includes("embodied intelligent robots that adapt to their environment and work at fine scale"), "English mode should translate the Feigong concept as embodied intelligent robots");
assert.ok(styles.includes(".hero h1") && styles.includes("white-space: nowrap"), "hero title should be constrained to one line");
assert.ok(html.includes("data-language-toggle"), "home page should include a Chinese/English language toggle");
assert.ok(html.includes("data-i18n=\"nav.home\""), "key navigation text should be language-switchable");
assert.ok(script.includes("applyLanguage"), "script should implement language switching");
assert.ok(script.includes("textTranslations"), "language switching should include full-page static text translations");
assert.ok(script.includes("translateStaticText"), "language switching should translate non-navigation page text");
assert.ok(script.includes('language === "en" ? "ZH" : "EN"'), "English mode language toggle should avoid Chinese text");
assert.ok(script.includes("translateAchievementText"), "English achievement view should use dedicated output translation logic");
assert.ok(!script.includes("return year ? `${label} (${year})` : label;"), "English achievement view should not fall back to generic placeholders like Publication (2026)");
assert.ok(script.includes('"团队主持国家自然科学基金项目 2 项、大科学装置培育项目等 10 余项'), "English mode should translate the achievement intro instead of stripping it to numbers");
assert.ok(script.includes('"国家自然科学基金项目 2 项、大科学装置培育项目等，主持经费 3400 万+。'), "English mode should translate the projects overview card instead of stripping it to numbers");
assert.ok(handoff.includes("亮点成果、项目、论文、专利、专著、获奖、社会任职"), "handoff should describe the updated achievement categories");
assert.ok(handoff.includes("孙瑜"), "handoff should mention the added Sun Yu mentor entry");
assert.ok(handoff.includes("中英文切换"), "handoff should mention the language toggle");

assert.ok(html.includes("团队关于触觉传感和灵巧操作的研究工作发表于Science 子刊"), "news should include current profile news from the school site");
assert.ok(html.includes("https://faculty.xjtu.edu.cn/content.jsp?urltype=news.NewsContentUrl"), "news should retain source links");
assert.ok(html.includes("杨来浩受邀担任 IEEE Sensors Reviews Associate Editor"), "news should include the IEEE Sensors Reviews Associate Editor appointment from the provided PDF");
assert.ok(html.includes("根据 IEEE Sensors Reviews 主编 Eui-Hyeok Yang 的邀请函"), "news should summarize the provided IEEE Sensors Reviews appointment letter");
assert.ok(html.includes("<time>2026-06-23</time>"), "IEEE Sensors Reviews appointment news should use the PDF saved date");
const newsDates = matchAll(/<article class="news-card(?: news-card-featured)?" data-news-type="[^"]+">([\s\S]*?)<\/article>/g)
  .map((match) => Number(match[1].match(/<time>(\d{4})-(\d{2})-(\d{2})<\/time>/)?.slice(1).join("")));
assertDescending(newsDates, "team news cards");
const newsFilterOrder = matchAll(/data-news-filter="([^"]+)"/g).map((match) => match[1]);
assert.deepEqual(newsFilterOrder.slice(0, 4), ["all", "highlight", "news", "notice"], "news filters should put highlight reports before news and notices");
assert.ok(html.includes('data-news-filter="notice"'), "news section should include a notice filter");
assert.ok(html.includes('data-news-filter="highlight"'), "news section should include a highlight report filter");
assert.ok(html.includes(">亮点报道</button>"), "news filter label should be highlight reports");
assert.ok(!html.includes(">亮点工作</button>"), "news filter label should no longer be highlight work");
assert.equal(matchAll(/<article class="news-card(?: news-card-featured)?" data-news-type="highlight">/g).length, 3, "news section should include 3 highlight work items");
assert.equal(matchAll(/<article class="news-card" data-news-type="news">/g).length, 16, "news section should include 16 current news items after adding the IEEE Sensors Reviews appointment");
assert.equal(matchAll(/<article class="news-card" data-news-type="notice">/g).length, 4, "news section should include 4 notice items");
assert.ok(html.includes("http://www.snrtv.com/snr_sxxwlb/a/2024/10/10/22818371.html"), "highlight work should cite the Shaanxi News source");
assert.ok(html.includes("https://www.163.com/dy/article/JGIRJRQ90530TBVC.html"), "highlight work should cite the Silk Road Weekly source");
assert.ok(html.includes("https://news.xjtu.edu.cn/info/1014/223743.htm"), "highlight work should cite the XJTU/CCTV source");
assert.ok(!html.includes("【央视正午国防军事】报道西安交大陈雪峰教授团队攻克“卡脖子”难题"), "CCTV report title should use Xi'an Jiaotong University team wording");
assert.ok(html.includes("【央视正午国防军事】报道西安交通大学团队攻克“卡脖子”难题"), "CCTV report title should use Xi'an Jiaotong University team wording");
assert.ok(html.includes("http://cqia.cqjtu.edu.cn/info/1183/4046.htm"), "news should include Chongqing Jiaotong University invited lecture report");
assert.ok(html.includes("https://cmce.szu.edu.cn/info/1017/8965.htm"), "news should include Shenzhen University invited lecture report");
assert.ok(html.includes("杨来浩受邀在 UNIfied 2026-SMMI 青年科学家论坛作报告"), "news should include the completed Youth Scientists Forum item from the conference manual");
assert.ok(html.includes("2026 International Conference on Advanced Sensing, Condition Monitoring, and Intelligent Maintenance Innovations"), "Youth Scientists Forum item should name the UNIfied 2026-SMMI conference");
assert.ok(html.includes("面向航空发动机原位检测与维修的机器人系统"), "Youth Scientists Forum item should include the Chinese report title from the conference manual");
assert.ok(html.includes("Robotic Systems for In-Situ Inspection and Repair of Aero-Engines"), "Youth Scientists Forum item should include the original English report title from the conference manual");
assert.ok(html.includes("广州大学赵志佳教授和西安交通大学严如强教授共同主持"), "Youth Scientists Forum item should include the forum chairs from the conference manual");
assert.ok(html.includes("四楼 Meeting Room 2"), "Youth Scientists Forum item should include the forum venue from the conference manual");
assert.ok(!html.includes("机器人具身智能如何赋能高端装备把脉问诊"), "Youth Scientists Forum item should no longer keep the earlier incomplete report title");
for (const video of ["新闻报道/陕西电视台-报道-web.mp4", "新闻报道/陕西卫视-丝路会客厅-web.mp4", "新闻报道/正午0714播出版-web.mp4"]) {
  assert.ok(html.includes(video), `highlight work should embed local report video: ${video}`);
}
assert.ok(html.includes("杨来浩副研究员获首届“太行杯”航空动力创新大赛优胜奖"), "news should include the latest Taihang Cup item from Yang Laihao's profile");
assert.ok(html.includes("https://gr.xjtu.edu.cn/yanglaihao/zh_CN/article/316893/content/35392.htm#article"), "Yang Laihao news links should be absolute");
assert.ok(html.includes("欢迎新同学加入课题组"), "notices should include Sun Yu group updates");
assert.ok(html.includes("https://faculty.xjtu.edu.cn/yu.sun/zh_CN/article/332021/content/23747.htm#article"), "Sun Yu news links should be absolute");
assert.ok(!html.includes("按保存的 Google Patents inventor:Laihao Yang 页面整理"), "international patent section should not show source-explanation text");
assert.ok(!html.includes("按保存的中国知网高级检索页面四页整理"), "Chinese patent section should not show source-explanation text");
assert.ok(!html.includes("同一专利若已授权，则仅保留授权号"), "patent section should not show deduplication explanation text");
assert.ok(!script.includes("Source: Prof. Yu Sun Faculty Homepage"), "English mode should not keep source-explanation translations");
assert.ok(!script.includes("Compiled from the saved Google Patents"), "English mode should not keep patent source-explanation translations");
assert.ok(!script.includes("Compiled from four saved CNKI"), "English mode should not keep patent source-explanation translations");
assert.ok(script.includes('"亮点报道": "Highlight Reports"'), "English mode should translate the highlight reports filter");
assert.ok(script.includes('"西安交大：仿生机器人给高端装备“把脉问诊”"'), "English mode should translate the Shaanxi News highlight title");
assert.ok(script.includes('"《丝路新周刊》节目预告 | 西安交大：用新型仿生机器人给高端装备“把脉问诊”"'), "English mode should translate the Silk Road Weekly highlight title");
assert.ok(script.includes('"【央视正午国防军事】报道西安交通大学团队攻克“卡脖子”难题"'), "English mode should translate the revised CCTV/XJTU highlight title");
assert.ok(script.includes('"杨来浩受邀赴重庆交通大学航空学院作前沿微课讲座"'), "English mode should translate the Chongqing Jiaotong invited lecture title");
assert.ok(script.includes('"杨来浩受邀赴深圳大学作机器人具身智能学术讲座"'), "English mode should translate the Shenzhen University invited lecture title");
assert.ok(script.includes('"杨来浩受邀在 UNIfied 2026-SMMI 青年科学家论坛作报告"'), "English mode should translate the completed Youth Scientists Forum title");
assert.ok(script.includes("Laihao Yang was invited to the Youth Scientists Forum of the 2026 International Conference on Advanced Sensing, Condition Monitoring, and Intelligent Maintenance Innovations"), "English mode should translate the completed Youth Scientists Forum summary");
assert.ok(script.includes('"杨来浩受邀担任 IEEE Sensors Reviews Associate Editor"'), "English mode should translate the IEEE Sensors Reviews Associate Editor appointment title");
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
assert.equal(publicationCount, 92, `expected 92 classified representative publications after removing two incorrect 2022 other-paper records, found ${publicationCount}`);
assert.equal(matchAll(/<article class="achievement" data-output-type="paper-other">/g).length, 2, "other papers should keep only two verified records");
assert.ok(!html.includes("叶端定时欠采样信号重构方法综述"), "incorrect 2022 other-paper record should be removed");
assert.ok(!html.includes("齿轮磨损对齿轮传动动态响应特征的影响"), "incorrect 2022 other-paper record should be removed");
assert.ok(!styles.includes("embodied-focus"), "research directions should use video assets directly");

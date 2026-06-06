const root = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");
const languageButton = document.querySelector("[data-language-toggle]");
const languageLabel = document.querySelector("[data-language-label]");
const i18nElements = document.querySelectorAll("[data-i18n]");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const newsFilters = document.querySelectorAll("[data-news-filter]");
const newsItems = document.querySelectorAll("[data-news-type]");
const outputFilters = document.querySelectorAll("[data-output-filter]");
const outputItems = document.querySelectorAll("[data-output-type]");
const paperSubfilters = document.querySelector("[data-paper-subfilters]");
const awardSubfilters = document.querySelector("[data-award-subfilters]");
const researchTabs = document.querySelectorAll("[data-research-target]");
const researchPanels = document.querySelectorAll("[data-research-panel]");
const memberTabs = document.querySelectorAll("[data-member-target]");
const memberPanels = document.querySelectorAll("[data-member-panel]");

let currentTheme = localStorage.getItem("theme") || "light";
let currentLanguage = localStorage.getItem("language") || "zh";
let researchRotation;

const translations = {
  zh: {
    "brand.title": "高端装备智能检修机器人团队",
    "brand.unit": "西安交通大学 · 机械工程学院",
    "nav.home": "首页",
    "nav.about": "团队简介",
    "nav.research": "研究方向",
    "nav.news": "团队动态",
    "nav.members": "团队成员",
    "nav.achievements": "团队成果",
    "nav.contact": "联系方式",
    "hero.title": "高端装备智能检修机器人团队",
    "hero.subtitle": "面向航空发动机等高端装备内部深腔、狭窄通道和复杂曲面损伤，团队构建“状态感知-原位进入-精准操作”一体化智能检修机器人体系，让装备维护从外部拆解走向在位、微创和智能化处置。",
    "hero.meta.diagnosis": "智能诊断",
    "hero.meta.intervention": "原位介入",
    "hero.meta.embodied": "具身操作",
    "hero.meta.continuum": "软体/连续体机器人",
    "hero.cta.research": "查看研究主线",
    "hero.cta.contact": "联系团队",
    "hero.facts.leader.label": "团队负责人",
    "hero.facts.leader.value": "杨来浩 副研究员",
    "hero.facts.unit.label": "依托单位",
    "hero.facts.unit.value": "西安交通大学机械工程学院",
    "hero.facts.outputs.label": "成果规模",
    "hero.facts.outputs.value": "论文 100+ / 专利 100+",
  },
  en: {
    "brand.title": "Advanced Equipment Intelligent Maintenance Robotics Team",
    "brand.unit": "Xi'an Jiaotong University · School of Mechanical Engineering",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.research": "Research",
    "nav.news": "News",
    "nav.members": "People",
    "nav.achievements": "Outputs",
    "nav.contact": "Contact",
    "hero.title": "Advanced Equipment Intelligent Maintenance Robotics Team",
    "hero.subtitle": "For aero-engines and other advanced equipment, the team builds an integrated intelligent maintenance robotics system for deep cavities, narrow passages, and damaged complex surfaces. The goal is to move maintenance from external disassembly toward in-situ, minimally invasive, and intelligent intervention.",
    "hero.meta.diagnosis": "Intelligent Diagnosis",
    "hero.meta.intervention": "In-situ Intervention",
    "hero.meta.embodied": "Embodied Manipulation",
    "hero.meta.continuum": "Soft / Continuum Robotics",
    "hero.cta.research": "Explore Research",
    "hero.cta.contact": "Contact Us",
    "hero.facts.leader.label": "Team Lead",
    "hero.facts.leader.value": "Laihao Yang, Associate Researcher",
    "hero.facts.unit.label": "Affiliation",
    "hero.facts.unit.value": "School of Mechanical Engineering, XJTU",
    "hero.facts.outputs.label": "Outputs",
    "hero.facts.outputs.value": "100+ papers / 100+ patents",
  },
};

const textTranslations = {
  "团队简介": "About the Team",
  "西安交通大学机械工程学院、航空发动机研究所。长期面向航空发动机健康管理、原位检修机器人、触觉感知与具身智能开展交叉研究，推动从装备状态识别、机器人进入到精细化维护的全链路技术落地。": "Based in the School of Mechanical Engineering and the Aero-engine Research Institute at Xi'an Jiaotong University, the team works across aero-engine health management, in-situ maintenance robotics, tactile perception, and embodied intelligence, advancing the full chain from condition recognition to robotic access and precision maintenance.",
  "学校主页": "XJTU Profile",
  "团队使命": "Mission",
  "让机器人能够在高端装备内部看得清、进得去、稳得住、修得准。": "Enable robots to perceive, enter, stabilize, and repair inside advanced equipment.",
  "学科交叉": "Interdisciplinary Research",
  "机器人学、机械工程、智能传感、结构动力学、人工智能与航空发动机健康管理。": "Robotics, mechanical engineering, intelligent sensing, structural dynamics, AI, and aero-engine health management.",
  "办公地点": "Office",
  "创新港高端装备研究院 2号巨构 2-5137。": "iHarbour Advanced Equipment Research Institute, Building 2, Room 2-5137.",
  "成果规模": "Output Scale",
  "主持项目 10余项，经费 3400万+；发表论文 100余篇，其中一作/通讯 SCI 论文 34篇。": "10+ led projects with 34M+ RMB in funding; 100+ papers, including 34 first-author or corresponding-author SCI papers.",
  "知识产权": "Intellectual Property",
  "公开发明专利 100余项，授权 50项，国际专利 7项，出版专著 1部。": "100+ published invention patents, 50 granted patents, 7 international patents, and 1 monograph.",
  "人才培养": "Student Development",
  "博士、硕士、本科生共同参与连续体机器人、智能诊断、触觉传感与具身操作研究。": "PhD, master's, and undergraduate students work together on continuum robotics, intelligent diagnosis, tactile sensing, and embodied manipulation.",
  "研究方向": "Research Directions",
  "团队研究主线可概括为“智能诊断、原位介入、具身操作”。三者构成从装备状态感知到机器人进入，再到精细处置的完整链路：先判断损伤在哪里、程度如何，再让柔顺机器人进入复杂深腔空间，最终融合人形机器人、灵巧手、触觉感知和具身智能实现稳定操作。": "The team's research is organized around intelligent diagnosis, in-situ intervention, and embodied manipulation. Together they form a complete chain from condition awareness to robotic access and precise operation: identifying where damage is and how severe it is, enabling compliant robots to enter complex cavities, and combining humanoid robots, dexterous hands, tactile sensing, and embodied intelligence for stable operations.",
  "研究主线：高端装备智能检修机器人": "Research Thread: Intelligent Maintenance Robotics for Advanced Equipment",
  "智能诊断": "Intelligent Diagnosis",
  "原位介入": "In-situ Intervention",
  "具身操作": "Embodied Manipulation",
  "判得准": "Accurate diagnosis",
  "进得去": "Reliable access",
  "操作稳": "Stable operation",
  "智能诊断：从损伤机理到可解释状态评估": "Intelligent Diagnosis: From Damage Mechanisms to Explainable Condition Assessment",
  "原位介入：面向深腔受限空间的连续体机器人": "In-situ Intervention: Continuum Robots for Deep and Constrained Spaces",
  "具身操作：从触觉感知到机器人精细维护": "Embodied Manipulation: From Tactile Perception to Precision Robotic Maintenance",
  "团队动态": "Team News",
  "全部": "All",
  "新闻": "News",
  "团队关于触觉传感和灵巧操作的研究工作发表于Science 子刊（Science Advances）": "The team's work on tactile sensing and dexterous manipulation was published in Science Advances",
  "团队在触觉传感与灵巧操作方向取得进展，相关研究发表于 Science Advances。": "The team made progress in tactile sensing and dexterous manipulation, with the work published in Science Advances.",
  "杨来浩副研究员入选 SmartBot 青年编委": "Associate Researcher Laihao Yang joined the SmartBot young editorial board",
  "杨来浩副研究员入选 SmartBot 青年编委，继续参与机器人相关学术共同体建设。": "Associate Researcher Laihao Yang joined the SmartBot young editorial board, continuing to contribute to the robotics research community.",
  "杨来浩副研究员荣获“应用基础与工程科学学报·2025年度优秀青年编委”": "Associate Researcher Laihao Yang received the 2025 Outstanding Young Editorial Board Member award from Journal of Basic Science and Engineering",
  "团队负责人获评应用基础与工程科学学报 2025 年度优秀青年编委。": "The team lead was named a 2025 Outstanding Young Editorial Board Member by Journal of Basic Science and Engineering.",
  "团队牵头、联合重庆大学获中国振动工程学会科学技术奖基础研究类二等奖": "The team, together with Chongqing University, won the second prize in basic research from the Chinese Society for Vibration Engineering",
  "团队牵头并联合重庆大学获得中国振动工程学会科学技术奖基础研究类二等奖。": "The team led the work and, together with Chongqing University, won the second prize in basic research from the Chinese Society for Vibration Engineering.",
  "团队“工业微创手术”高端装备原位维护机器人研究成果被央视报道": "The team's in-situ maintenance robotics work for industrial minimally invasive operations was reported by CCTV",
  "团队关于高端装备原位维护机器人的相关研究成果被央视正午国防军事报道。": "The team's research on in-situ maintenance robots for advanced equipment was reported by CCTV's noon defense and military program.",
  "郑毅硕士论文获评 2025 年西安交通大学优秀硕士论文": "Zheng Yi's master's thesis was named a 2025 Outstanding Master's Thesis of Xi'an Jiaotong University",
  "2025 级硕士毕业生郑毅的《多节连续体机器人控制策略研究与系统设计》获评校级优秀硕士论文。": "Zheng Yi's thesis on control strategies and system design for multi-section continuum robots was named an outstanding master's thesis at XJTU.",
  "杨来浩副研究员当选 International Journal of Advanced Robotic Systems 副主编": "Associate Researcher Laihao Yang was appointed Associate Editor of the International Journal of Advanced Robotic Systems",
  "杨来浩副研究员当选 Biomimetic Intelligence and Robotics 青年编委": "Associate Researcher Laihao Yang joined the young editorial board of Biomimetic Intelligence and Robotics",
  "杨来浩副研究员赴商发开展学术交流": "Associate Researcher Laihao Yang visited AECC Commercial Aircraft Engine for academic exchange",
  "杨来浩副研究员赴商发与高新技术部、商发制造、测试中心等单位开展学术交流。": "Associate Researcher Laihao Yang visited AECC Commercial Aircraft Engine and held academic exchanges with its advanced technology, manufacturing, and testing teams.",
  "团队成员": "Team Members",
  "团队围绕高端装备智能检修机器人形成多层次人才培养体系，覆盖团队领导、教师/合作导师、博士后、博士研究生、硕士研究生、本科生和毕业生。以下名单根据学校教师主页公开成员信息整理。": "The team has a multi-level training structure around intelligent maintenance robotics for advanced equipment, covering the team lead, faculty and collaborating mentors, postdocs, PhD students, master's students, undergraduates, and alumni.",
  "团队领导": "Team Lead",
  "杨来浩": "Laihao Yang",
  "杨来浩 副研究员": "Laihao Yang, Associate Researcher",
  "副研究员，博士。西安交通大学机械工程学院、航空发动机研究所。": "Associate Researcher, PhD. School of Mechanical Engineering and Aero-engine Research Institute, Xi'an Jiaotong University.",
  "中国振动工程学会动态信号分析专业委员会理事": "Council member, Dynamic Signal Analysis Committee, Chinese Society for Vibration Engineering",
  "中国计算机学会智能机器人专业委员会委员": "Member, Intelligent Robotics Committee, China Computer Federation",
  "IFToMM 中国委员会委员": "Member, IFToMM China Committee",
  "多个期刊青年编委或编辑任职": "Young editorial board member or editor for multiple journals",
  "教师 / 合作导师": "Faculty / Collaborating Mentors",
  "孙瑜": "Yu Sun",
  "副教授 · 博士生导师 / 硕士生导师": "Associate Professor · PhD and Master's Supervisor",
  "机械工程学院。主要研究方向包括软体/可折展机器人、触觉传感与交互、智能检测与诊断、航空发动机健康管理；每年计划招收硕士 3-4 名、博士 1-2 名，并欢迎本科生 2-3 名参与科研。": "School of Mechanical Engineering. Research interests include soft and deployable robots, tactile sensing and interaction, intelligent inspection and diagnosis, and aero-engine health management. She plans to recruit 3-4 master's students and 1-2 PhD students per year, and welcomes 2-3 undergraduates to participate in research.",
  "学术型硕士（3人/年）：新一代人工智能与传感、航空发动机机器人检测技术、航空发动机先进传感与健康管理。": "Academic master's students (3/year): next-generation AI and sensing, aero-engine robotic inspection technology, and advanced sensing and health management for aero-engines.",
  "专业型硕士（1-2人/年）：高端/智能制造装备与系统、重大装备运行性能与智能维护。": "Professional master's students (1-2/year): advanced/intelligent manufacturing equipment and systems, major equipment operating performance and intelligent maintenance.",
  "学术型博士（1-2人/年）：新一代人工智能与传感、航空发动机机器人检测技术、航空发动机与航天器先进传感及健康管理、智能检测、诊断与控制技术。": "Academic PhD students (1-2/year): next-generation AI and sensing, aero-engine robotic inspection, advanced sensing and health management for aero-engines and spacecraft, intelligent inspection, diagnosis, and control.",
  "个人主页": "Profile",
  "博士后": "Postdocs",
  "博士研究生": "PhD Students",
  "硕士研究生": "Master's Students",
  "本科生": "Undergraduates",
  "已毕业": "Alumni",
  "团队成果": "Team Outputs",
  "项目": "Projects",
  "论文": "Papers",
  "专利": "Patents",
  "专著": "Book",
  "获奖": "Awards",
  "社会任职": "Academic Service",
  "全部论文": "All Papers",
  "SCI 期刊": "SCI Journals",
  "EI 期刊": "EI Journals",
  "EI 会议": "EI Conferences",
  "预印本": "Preprints",
  "其他论文": "Other Papers",
  "全部获奖": "All Awards",
  "科学技术奖": "Science and Technology Awards",
  "科技论文获奖": "Paper Awards",
  "学生竞赛获奖": "Student Competition Awards",
  "社会奖励": "Professional Awards",
  "学位论文获奖": "Thesis Awards",
  "成果条目": "Output Entries",
  "联系方式": "Contact",
  "欢迎围绕高端装备智能检修机器人、软体/连续体机器人、智能传感、航空发动机健康管理和 AI for Science 开展交流合作。": "We welcome collaboration on intelligent maintenance robotics for advanced equipment, soft/continuum robots, intelligent sensing, aero-engine health management, and AI for Science.",
  "扫码访问团队主页": "Scan to visit the team site",
};

const staticTextNodes = [];
const textWalker = document.createTreeWalker(document.body, 4, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
    if (parent.closest("script, style, svg")) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  },
});

while (textWalker.nextNode()) {
  staticTextNodes.push({ node: textWalker.currentNode, original: textWalker.currentNode.nodeValue });
}

function stripChinese(text) {
  return text.replace(/[\u3400-\u9fff]/g, "").replace(/\s+/g, " ").trim();
}

function fallbackEnglishText(text, node) {
  const parent = node.parentElement;
  const achievement = parent?.closest(".achievement");
  if (achievement) {
    const year = achievement.querySelector(".pub-year")?.textContent?.trim();
    const type = achievement.dataset.outputType || "output";
    const label = type.startsWith("paper")
      ? "Publication"
      : type === "project"
        ? "Research project"
        : type === "patent"
          ? "Patent"
          : type === "book"
            ? "Book"
            : type.startsWith("award")
              ? "Award"
              : "Academic service";
    return year ? `${label} (${year})` : label;
  }
  if (parent?.closest(".member-category")) return "Team member information";
  if (parent?.closest(".news-card")) return "Team news";
  if (parent?.closest(".info-card")) return "Team profile";
  return stripChinese(text) || "Team information";
}

function translateOriginalText(original, node) {
  const trimmed = original.replace(/\s+/g, " ").trim();
  if (!trimmed || !/[\u3400-\u9fff]/.test(trimmed)) return original;
  const translated = textTranslations[trimmed] || fallbackEnglishText(trimmed, node);
  return original.replace(trimmed, translated);
}

function translateStaticText(language) {
  staticTextNodes.forEach(({ node, original }) => {
    node.nodeValue = language === "en" ? translateOriginalText(original, node) : original;
  });
}

function applyTheme(theme) {
  currentTheme = theme;
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function applyLanguage(language) {
  currentLanguage = language;
  root.lang = language === "en" ? "en" : "zh-CN";
  root.dataset.language = language;
  localStorage.setItem("language", language);

  i18nElements.forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[language]?.[key];
    if (value) {
      element.textContent = value;
    }
  });
  translateStaticText(language);
  document.title =
    language === "en"
      ? "Advanced Equipment Intelligent Maintenance Robotics Team | Xi'an Jiaotong University"
      : "高端装备智能检修机器人团队 | 西安交通大学";

  if (languageLabel) {
    languageLabel.textContent = language === "en" ? "ZH" : "EN";
  }
  languageButton?.setAttribute("aria-pressed", String(language === "en"));
}

function applyFilter(buttons, items, buttonAttr, itemAttr, selected) {
  buttons.forEach((button) => {
    const buttonValue = button.dataset[buttonAttr];
    const isPaperButtonGroup = button.dataset.outputRoot === "paper" && selected?.startsWith("paper");
    const isAwardButtonGroup = button.dataset.outputRoot === "award" && selected?.startsWith("award");
    const isActive = buttonValue === selected || isPaperButtonGroup;
    button.classList.toggle("active", isActive || isAwardButtonGroup);
    if (button.getAttribute("role") === "tab") {
      button.setAttribute("aria-selected", String(isActive || isAwardButtonGroup));
    }
  });

  items.forEach((item) => {
    const itemValue = item.dataset[itemAttr];
    const isPaperGroup = selected === "paper" && itemValue?.startsWith("paper");
    const isAwardGroup = selected === "award" && itemValue?.startsWith("award");
    const isProjectGroup = selected === "project" && itemValue?.startsWith("project");
    const isServiceGroup = selected === "service" && itemValue?.startsWith("service");
    item.hidden = selected !== "all" && itemValue !== selected && !isPaperGroup && !isAwardGroup && !isProjectGroup && !isServiceGroup;
  });
}

function showOutputCategory(selected) {
  const isPaperSelection = selected?.startsWith("paper");
  const isAwardSelection = selected?.startsWith("award");
  if (paperSubfilters) {
    paperSubfilters.hidden = !isPaperSelection;
  }
  if (awardSubfilters) {
    awardSubfilters.hidden = !isAwardSelection;
  }
  applyFilter(outputFilters, outputItems, "outputFilter", "outputType", selected);
}

function showResearchPanel(selected) {
  researchTabs.forEach((tab) => {
    const isActive = tab.dataset.researchTarget === selected;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  researchPanels.forEach((panel) => {
    panel.hidden = panel.dataset.researchPanel !== selected;
    panel.classList.toggle("active", panel.dataset.researchPanel === selected);
  });
}

function rotateResearchPanel() {
  const tabs = Array.from(researchTabs);
  if (!tabs.length) return;

  const activeIndex = tabs.findIndex((tab) => tab.classList.contains("active"));
  const nextTab = tabs[(activeIndex + 1) % tabs.length];
  showResearchPanel(nextTab.dataset.researchTarget);
}

function showMemberPanel(selected) {
  memberTabs.forEach((tab) => {
    const isActive = tab.dataset.memberTarget === selected;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  memberPanels.forEach((panel) => {
    const isActive = panel.dataset.memberPanel === selected;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

themeButton?.addEventListener("click", () => {
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

languageButton?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "zh" ? "en" : "zh");
});

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

newsFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    applyFilter(newsFilters, newsItems, "newsFilter", "newsType", filter.dataset.newsFilter);
  });
});

outputFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    showOutputCategory(filter.dataset.outputFilter);
  });
});

researchTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    window.clearInterval(researchRotation);
    showResearchPanel(tab.dataset.researchTarget);
  });
});

memberTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showMemberPanel(tab.dataset.memberTarget);
  });
});

if (researchTabs.length > 1) {
  researchRotation = window.setInterval(rotateResearchPanel, 8500);
}

applyTheme(currentTheme);
applyLanguage(currentLanguage);
showOutputCategory("project");

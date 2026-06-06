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
    "hero.subtitle": "面向航空发动机等高端装备的复杂深腔、受限空间和关键零部件损伤问题，团队围绕“判得准、进得去、操作稳”构建智能诊断、原位介入与具身操作一体化研究体系。",
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
    "hero.subtitle": "For aero-engines and other advanced equipment, the team studies inspection and maintenance in deep cavities, constrained spaces, and damaged critical components. Its work integrates intelligent diagnosis, in-situ intervention, and embodied manipulation: sensing accurately, entering reliably, and operating steadily.",
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

  if (languageLabel) {
    languageLabel.textContent = language === "en" ? "中" : "EN";
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
showOutputCategory("paper");

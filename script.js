const root = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const newsFilters = document.querySelectorAll("[data-news-filter]");
const newsItems = document.querySelectorAll("[data-news-type]");
const outputFilters = document.querySelectorAll("[data-output-filter]");
const outputItems = document.querySelectorAll("[data-output-type]");
const researchTabs = document.querySelectorAll("[data-research-target]");
const researchPanels = document.querySelectorAll("[data-research-panel]");

let currentTheme = localStorage.getItem("theme") || "light";
let researchRotation;

function applyTheme(theme) {
  currentTheme = theme;
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function applyFilter(buttons, items, buttonAttr, itemAttr, selected) {
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset[buttonAttr] === selected);
  });

  items.forEach((item) => {
    item.hidden = selected !== "all" && item.dataset[itemAttr] !== selected;
  });
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

themeButton?.addEventListener("click", () => {
  applyTheme(currentTheme === "light" ? "dark" : "light");
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
    applyFilter(outputFilters, outputItems, "outputFilter", "outputType", filter.dataset.outputFilter);
  });
});

researchTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    window.clearInterval(researchRotation);
    showResearchPanel(tab.dataset.researchTarget);
  });
});

if (researchTabs.length > 1) {
  researchRotation = window.setInterval(rotateResearchPanel, 8500);
}

applyTheme(currentTheme);

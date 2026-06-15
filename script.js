const root = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");
const languageButton = document.querySelector("[data-language-toggle]");
const languageLabel = document.querySelector("[data-language-label]");
const i18nElements = document.querySelectorAll("[data-i18n]");
const metaDescription = document.querySelector('meta[name="description"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const newsFilters = document.querySelectorAll("[data-news-filter]");
const newsItems = document.querySelectorAll("[data-news-type]");
const outputFilters = document.querySelectorAll("[data-output-filter]");
const outputItems = document.querySelectorAll("[data-output-type]");
const paperSubfilters = document.querySelector("[data-paper-subfilters]");
const patentSubfilters = document.querySelector("[data-patent-subfilters]");
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
    "meta.description": "西安交通大学高端装备智能检修机器人团队，聚焦智能诊断、原位介入、具身操作、软体/连续体机器人、智能传感与航空发动机健康管理。",
    "meta.ogTitle": "高端装备智能检修机器人团队 | 西安交通大学",
    "meta.ogDescription": "面向航空发动机等高端装备，开展智能诊断、原位介入、具身操作、智能传感与健康管理研究。",
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
    "meta.description": "The Advanced Equipment Intelligent Maintenance Robotics Team at Xi'an Jiaotong University works on intelligent diagnosis, in-situ intervention, embodied manipulation, soft and continuum robots, intelligent sensing, and aero-engine health management.",
    "meta.ogTitle": "Advanced Equipment Intelligent Maintenance Robotics Team | Xi'an Jiaotong University",
    "meta.ogDescription": "Research on intelligent diagnosis, in-situ intervention, embodied manipulation, intelligent sensing, and health management for aero-engines and other advanced equipment.",
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

const attributeTranslations = [
  { selector: ".brand", attribute: "aria-label", zh: "回到首页", en: "Back to home" },
  { selector: ".meta-list", attribute: "aria-label", zh: "团队概览", en: "Team overview" },
  { selector: ".hero-visual", attribute: "aria-label", zh: "团队研究图像", en: "Team research image" },
  { selector: '.hero-visual img[src="assets/team-profile.jpg"]', attribute: "alt", zh: "团队相关研究展示图", en: "Research showcase for the team" },
  { selector: '.leader-card img[src="assets/leader-yang.png"]', attribute: "alt", zh: "杨来浩副研究员照片", en: "Portrait of Associate Researcher Laihao Yang" },
  { selector: '.member-leader img[src="assets/leader-yang.png"]', attribute: "alt", zh: "杨来浩副研究员照片", en: "Portrait of Associate Researcher Laihao Yang" },
  { selector: '.research-tabs', attribute: "aria-label", zh: "研究方向切换", en: "Research direction switcher" },
  { selector: 'video[poster="assets/research-diagnosis.gif"]', attribute: "aria-label", zh: "智能诊断方向视频", en: "Intelligent diagnosis research video" },
  { selector: 'video[poster="assets/research-intervention.gif"]', attribute: "aria-label", zh: "原位介入方向视频", en: "In-situ intervention research video" },
  { selector: 'video[poster="assets/research-embodied.png"]', attribute: "aria-label", zh: "具身操作方向视频", en: "Embodied manipulation research video" },
  { selector: ".member-tabs", attribute: "aria-label", zh: "团队成员分组", en: "Team member groups" },
  { selector: ".output-primary-filters", attribute: "aria-label", zh: "成果一级板块", en: "Primary output categories" },
  { selector: "[data-paper-subfilters]", attribute: "aria-label", zh: "论文二级分类", en: "Publication subcategories" },
  { selector: "[data-patent-subfilters]", attribute: "aria-label", zh: "专利二级分类", en: "Patent subcategories" },
  { selector: "[data-award-subfilters]", attribute: "aria-label", zh: "获奖二级分类", en: "Award subcategories" },
  { selector: '.site-qr img', attribute: "alt", zh: "团队主页二维码", en: "QR code for the team website" },
  { selector: ".visitor-stats", attribute: "aria-label", zh: "站点访问统计", en: "Site visit statistics" },
];

const textTranslations = {
  "团队简介": "About the Team",
  "面向航空发动机等高端装备内部深腔、狭窄通道和复杂曲面损伤，团队构建“状态感知-原位进入-精准操作”一体化智能检修机器人体系，让装备维护从外部拆解走向在位、微创和智能化处置。": "For deep cavities, narrow passages, and damaged complex surfaces inside aero-engines and other advanced equipment, the team builds an integrated intelligent maintenance robotics system spanning condition awareness, in-situ access, and precision operation.",
  "团队负责人": "Team Lead",
  "杨来浩 副研究员": "Laihao Yang, Associate Researcher",
  "依托单位": "Affiliation",
  "西安交通大学机械工程学院": "School of Mechanical Engineering, Xi'an Jiaotong University",
  "论文 100+ / 专利 100+": "100+ papers / 100+ patents",
  "团队依托西安交通大学机械工程学院和航空发动机研究所，聚焦航空发动机、燃机、航天器等高端装备的服役安全与智能维护。围绕“看得清、进得去、修得准”的核心挑战，团队融合机器人学、智能传感、结构动力学、数字孪生和可解释人工智能，发展面向真实装备场景的智能诊断、原位介入和具身操作技术。": "Based in the School of Mechanical Engineering and the Aero-engine Research Institute at Xi'an Jiaotong University, the team focuses on service safety and intelligent maintenance for aero-engines, gas turbines, spacecraft, and other advanced equipment. Around the core challenges of seeing clearly, entering constrained spaces, and repairing precisely, the team integrates robotics, intelligent sensing, structural dynamics, digital twins, and explainable AI.",
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
  "原位介入：让柔顺机器人进入复杂深腔": "In-situ Intervention: Enabling Compliant Robots to Enter Complex Deep Cavities",
  "具身操作：从触觉感知到机器人精细维护": "Embodied Manipulation: From Tactile Perception to Precision Robotic Maintenance",
  "具身操作：融合触觉、灵巧手与具身智能": "Embodied Manipulation: Integrating Tactile Sensing, Dexterous Hands, and Embodied Intelligence",
  "面向航空发动机、燃机等高端装备关键零部件，研究裂纹、烧蚀、掉角、漏油等损伤的演化机理与多源信号表征，结合叶尖定时、非接触振动监测、信号采集调理和可解释深度学习，实现损伤位置、程度与风险的定量诊断。": "For critical components in aero-engines, gas turbines, and other advanced equipment, the team studies damage evolution and multi-source signal signatures for cracks, ablation, corner loss, oil leakage, and related faults. Blade tip timing, non-contact vibration monitoring, signal acquisition and conditioning, and explainable deep learning are combined for quantitative diagnosis of damage location, severity, and risk.",
  "非接触振动监测、叶尖定时与多传感信号融合": "Non-contact vibration monitoring, blade tip timing, and multi-sensor fusion",
  "数字孪生驱动的转子叶片健康监测与在线评估": "Digital-twin-driven health monitoring and online assessment of rotating blades",
  "物理模型约束的数据智能诊断和不确定性分析": "Physics-constrained data-driven diagnosis and uncertainty analysis",
  "面向高端装备内部狭窄、弯曲、遮挡和接触丰富的受限空间，发展连续体机器人、爬行机器人与柔顺关节创新设计，研究高效力学建模、运动规划和接触安全控制，使机器人能够原位抵达检测、维护和处置目标区域。": "For narrow, curved, occluded, and contact-rich constrained spaces inside advanced equipment, the team develops continuum robots, crawling robots, and compliant joint designs, together with efficient mechanics modeling, motion planning, and contact-safe control so robots can reach target areas for inspection, maintenance, and intervention in situ.",
  "连续体机器人结构设计、动力学建模与高精度控制": "Continuum robot structural design, dynamics modeling, and high-precision control",
  "深腔探入式检测机器人系统与路径规划方法": "Deep-cavity inspection robot systems and path-planning methods",
  "复杂受限空间中的柔顺交互、接触感知与安全介入": "Compliant interaction, contact sensing, and safe intervention in complex constrained spaces",
  "以“操作稳”为目标，融合人形机器人、灵巧手、触觉电子皮肤、视觉检测和具身智能决策技术，研究高端装备精细操作、原位处置和多机器人协同，使机器人不仅能够进入装备内部，还能够在复杂环境中稳定完成检测、打磨、夹持与处置任务。": "With stable operation as the target, the team integrates humanoid robots, dexterous hands, tactile electronic skin, visual inspection, and embodied decision-making. The work supports precision manipulation, in-situ intervention, and multi-robot collaboration for advanced equipment, so robots can not only enter equipment interiors but also perform inspection, polishing, grasping, and intervention tasks reliably in complex environments.",
  "多维力触觉电子皮肤、柔性传感与操作反馈": "Multidimensional tactile electronic skin, flexible sensing, and manipulation feedback",
  "灵巧手和人形机器人辅助的精细操作策略": "Fine manipulation strategies assisted by dexterous hands and humanoid robots",
  "视觉-触觉-力控融合的具身智能任务执行": "Embodied task execution with vision, touch, and force-control fusion",
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
  "围绕高端装备智能检修机器人，团队形成了从项目牵引、论文发表、专利布局、专著出版到科技奖励和学术服务的成果体系。当前页面按公开资料整理代表性条目，并支持按成果类型快速筛选。": "Around intelligent maintenance robotics for advanced equipment, the team has built an output portfolio spanning funded projects, papers, patents, a monograph, awards, and academic service. This page organizes representative public entries and supports filtering by output type.",
  "论文与专著": "Papers and Book",
  "100余篇 / 1部": "100+ papers / 1 book",
  "发表高水平论文 100 余篇，其中一作/通讯 SCI 论文 34 篇，出版专著 1 部。": "100+ high-level papers, including 34 first-author or corresponding-author SCI papers, and 1 monograph.",
  "专利 100余项": "100+ patents",
  "公开发明专利 100 余项，授权 50 项，国际专利 7 项。": "100+ published invention patents, 50 granted patents, and 7 international patents.",
  "奖励与传播": "Awards and Visibility",
  "多项省部级/行业奖励": "Multiple provincial, ministerial, and industry awards",
  "获中国振动工程学会科学技术奖二等奖、陕西高校科技一等奖、机器人科学引领奖等，并被 CCTV7、China Daily、陕西新闻联播等报道。": "Recognized by the Chinese Society for Vibration Engineering Science and Technology Award, Shaanxi Higher Education Science and Technology Award, Robotics Science Leadership Award, and media coverage from CCTV7, China Daily, Shaanxi News, and others.",
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
  "全部专利": "All Patents",
  "国际专利": "International Patents",
  "中国专利": "Chinese Patents",
  "全部获奖": "All Awards",
  "科学技术奖": "Science and Technology Awards",
  "科技论文获奖": "Paper Awards",
  "学生竞赛获奖": "Student Competition Awards",
  "社会奖励": "Professional Awards",
  "学位论文获奖": "Thesis Awards",
  "成果条目": "Output Entries",
  "国家自然科学基金项目 · 2025.01-2028.12": "National Natural Science Foundation of China · 2025.01-2028.12",
  "航空发动机原位维护连续体机器人": "Continuum Robot for In-situ Aero-engine Maintenance",
  "52475129 · 国家自然科学基金": "52475129 · National Natural Science Foundation of China",
  "国家自然科学基金项目 · 2024.01-2027.12": "National Natural Science Foundation of China · 2024.01-2027.12",
  "剪纸启发的复杂曲面顺应可控仿生干粘附设计": "Kirigami-inspired Controllable Biomimetic Dry Adhesion for Complex Curved Surfaces",
  "52375125 · 纵向项目": "52375125 · Government-funded project",
  "中央引导科技发展资金 · 2023.05-2024.12": "Central Government-guided Science and Technology Development Fund · 2023.05-2024.12",
  "***智能检测关键技术与系统研发": "Key Technologies and System Development for Intelligent Inspection",
  "XXX · 纵向项目": "Confidential · Government-funded project",
  "大科学装置群 · 2023.04-2025.04": "Large Scientific Facility Cluster · 2023.04-2025.04",
  "主轴承XXX": "Main Bearing Research Project",
  "XXX · 横向项目": "Confidential · Industry-funded project",
  "十四五预研项目 · 2022.12-2025.12": "14th Five-Year Pre-research Project · 2022.12-2025.12",
  "XXX机器人设计与柔顺控制": "Robot Design and Compliant Control",
  "国务院各部委项目 · 2022.10-2024.10": "National Ministry-level Project · 2022.10-2024.10",
  "XXX关键部件稀疏智能健康管理方法研究": "Sparse Intelligent Health Management Methods for Key Components",
  "HT-P2022 · 纵向项目": "HT-P2022 · Government-funded project",
  "重点实验室开放基金 · 2022.09-2024.07": "Open Fund of Key Laboratory · 2022.09-2024.07",
  "数字孪生框架下航空发动机转子叶片裂纹稀疏定量监测诊断": "Sparse Quantitative Monitoring and Diagnosis of Aero-engine Rotor Blade Cracks under a Digital Twin Framework",
  "pkl20220001 · 纵向项目": "pkl20220001 · Government-funded project",
  "自由探索 · 2022.06-2023.12": "Free Exploration Project · 2022.06-2023.12",
  "物理驱动的航空发动机转子叶片裂纹可解释深度智能监测诊断": "Physics-driven Explainable Deep Intelligent Monitoring and Diagnosis of Aero-engine Rotor Blade Cracks",
  "xzy012022058 · 纵向项目": "xzy012022058 · Government-funded project",
  "国家自然科学基金项目 · 2022.01-2024.12": "National Natural Science Foundation of China · 2022.01-2024.12",
  "旋转叶片裂纹的叶端定时物理模型-连续压缩感知协同监测研究": "Cooperative Monitoring of Rotating Blade Cracks with Blade-tip-timing Physical Models and Continuous Compressed Sensing",
  "52105117 · 纵向项目": "52105117 · Government-funded project",
  "青年学术骨干培植项目 · 2021.07-2021.12": "Young Academic Backbone Cultivation Project · 2021.07-2021.12",
  "深度网络驱动的航空发动机叶片损伤视觉智能检测方法研究": "Deep-network-driven Visual Intelligent Detection of Aero-engine Blade Damage",
  "xpt012021030 · 纵向项目": "xpt012021030 · Government-funded project",
  "国家自然科学基金项目 · 2021.01-2024.12": "National Natural Science Foundation of China · 2021.01-2024.12",
  "数字孪生驱动的航空发动机转子叶片健康监测": "Digital-twin-driven Health Monitoring of Aero-engine Rotor Blades",
  "52075414 · 纵向项目": "52075414 · Government-funded project",
  "航空发动机主轴承及传动系统故障智能诊断研究": "Intelligent Fault Diagnosis for Aero-engine Main Bearings and Transmission Systems",
  "92060302 · 纵向项目": "92060302 · Government-funded project",
  "中国航发四川燃气涡轮研究院 · 2020.12-2022.12": "AECC Sichuan Gas Turbine Establishment · 2020.12-2022.12",
  "面向空地一致性的航空发动机主轴承服役性能分析技术": "Service Performance Analysis of Aero-engine Main Bearings for Air-ground Consistency",
  "J202012057 · 横向项目": "J202012057 · Industry-funded project",
  "中国航空沈阳飞机设计研究所 · 2020.11-2021.11": "AVIC Shenyang Aircraft Design and Research Institute · 2020.11-2021.11",
  "运动机构及机械传动系统仿真评估软件": "Simulation and Evaluation Software for Motion Mechanisms and Mechanical Transmission Systems",
  "J202101007 · 横向项目": "J202101007 · Industry-funded project",
  "国务院各部委项目 · 2020.04-2025.04": "National Ministry-level Project · 2020.04-2025.04",
  "***检测机器人系统基础研究": "Basic Research on Inspection Robot Systems",
  "2019-XXXX-XX-XXX-XX · 纵向项目": "2019-XXXX-XX-XXX-XX · Government-funded project",
  "国家攻关项目 · 2018.08-2021.12": "National Key Research Project · 2018.08-2021.12",
  "***叶片裂纹***": "Blade Crack Research Project",
  "2017-V-0009 · 纵向项目": "2017-V-0009 · Government-funded project",
  "国家自然科学基金项目 · 2017.01-2019.12": "National Natural Science Foundation of China · 2017.01-2019.12",
  "航空发动机快变信号稀疏时频诊断方法研究": "Sparse Time-frequency Diagnosis of Fast-varying Aero-engine Signals",
  "51605366 · 纵向项目": "51605366 · Government-funded project",
  "973项目 · 2015.01-2019.12": "973 Program · 2015.01-2019.12",
  "航空发动机运行安全基础研究": "Basic Research on Aero-engine Operational Safety",
  "2015CB057400 · 纵向项目": "2015CB057400 · Government-funded project",
  "发明专利": "Invention Patent",
  "发明专利 ·": "Invention Patent ·",
  "来源": "Source",
  "Google Scholar 公开页本轮访问受限，待逐条核验后补齐专利号。": "The public Google Scholar page was access-limited in this pass; patent numbers will be completed after item-level verification.",
  "学校主页确认国际专利 7 项；Google Scholar 公开页本轮访问受限，待逐条核验后补齐专利号。": "The XJTU profile confirms 7 international patents; the public Google Scholar page was access-limited in this pass, so patent numbers will be completed after item-level verification.",
  "CNKI / 学校主页": "CNKI / XJTU Profile",
  "按西安交通大学教师主页“专利成果”公开列表整理，共 12 条。": "Compiled from the public Patents page on the Xi'an Jiaotong University faculty profile, with 12 entries.",
  "一种测试连续体机器人力学性能的方法和装置": "Method and Device for Testing the Mechanical Properties of a Continuum Robot",
  "一种连续体机械臂重建方法": "Reconstruction Method for a Continuum Manipulator",
  "一种连续体机器人的线缆布局方法": "Cable Layout Method for a Continuum Robot",
  "检测航空发动机叶片的爬行机器人": "Crawling Robot for Inspecting Aero-engine Blades",
  "一种线驱动连续体机器人的电控系统": "Electronic Control System for a Cable-driven Continuum Robot",
  "一种线驱动连续体机器人的驱动机构": "Driving Mechanism for a Cable-driven Continuum Robot",
  "数字孪生驱动的航空发动机旋转叶片裂纹定量识别方法": "Digital-twin-driven Quantitative Identification Method for Aero-engine Rotating Blade Cracks",
  "一种外啮合直齿轮磨损下的啮合刚度的建模方法": "Modeling Method for Meshing Stiffness under Wear of External Spur Gears",
  "一种线驱动连续体机器人": "Cable-driven Continuum Robot",
  "一种线驱动连续体柔性机器人": "Cable-driven Flexible Continuum Robot",
  "一种基于叶端定时的转子叶片动应变场测量方法及其系统": "Rotor Blade Dynamic Strain Field Measurement Method and System Based on Blade Tip Timing",
  "一种旋转叶片位移场反演重构方法及其系统": "Rotating Blade Displacement Field Inversion Reconstruction Method and System",
  "专著": "Monograph",
  "钛基复合材料多尺度力学": "Multiscale Mechanics of Titanium Matrix Composites",
  "孙瑜, 杨丹卉, 杨来浩 · 西北工业大学出版社": "Yu Sun, Danhui Yang, Laihao Yang · Northwestern Polytechnical University Press",
  "科学技术奖": "Science and Technology Award",
  "陕西省科技进步一等奖": "First Prize, Shaanxi Science and Technology Progress Award",
  "中国振动工程学会科学技术奖二等奖（基础研究类，排 1）": "Second Prize, Science and Technology Award of the Chinese Society for Vibration Engineering (Basic Research, ranked 1st)",
  "陕西省高等学校科学技术奖一等奖": "First Prize, Shaanxi Higher Education Science and Technology Award",
  "科技论文获奖": "Paper Award",
  "2025航空装备智能制造大会，优秀论文报告": "Outstanding Paper Presentation, 2025 Aviation Equipment Intelligent Manufacturing Conference",
  "第十六届全国振动理论及应用学术会议，高水平论文奖": "High-level Paper Award, 16th National Conference on Vibration Theory and Applications",
  "第五届中国机器人学术年会最佳海报奖": "Best Poster Award, 5th China Robotics Academic Annual Conference",
  "2024年中国航天大会航天超材料与超结构技术专题论坛高水平论文奖": "High-level Paper Award, 2024 China Space Conference Forum on Aerospace Metamaterials and Metastructures",
  "学生竞赛获奖": "Student Competition Award",
  "第十届软体机器人大会软体机器人创新设计竞赛二等奖": "Second Prize, Soft Robot Innovation Design Competition, 10th Soft Robotics Conference",
  "第三届中国空天动力创新创业大赛二等奖": "Second Prize, 3rd China Aerospace Power Innovation and Entrepreneurship Competition",
  "首届“太行杯”航空动力创新大赛优胜奖": "Merit Award, 1st Taihang Cup Aviation Power Innovation Competition",
  "第九届软体机器人大会软体机器人创新设计竞赛二等奖（2项）、优秀奖1项": "Two Second Prizes and one Merit Award, Soft Robot Innovation Design Competition, 9th Soft Robotics Conference",
  "中国大学生机械工程创新创意大赛“明石杯”微纳传感技术与智能应用初赛二等奖": "Second Prize, Mingshi Cup Micro-nano Sensing Technology and Intelligent Application Preliminary Contest, China College Student Mechanical Engineering Innovation Competition",
  "社会奖励": "Professional Award",
  "应用基础与工程科学学报优秀青年编委": "Outstanding Young Editorial Board Member, Journal of Basic Science and Engineering",
  "第五届中国机器人行业年会“机器人科学引领奖”（排1）": "Robotics Science Leadership Award, 5th China Robotics Industry Annual Conference (ranked 1st)",
  "学位论文获奖": "Thesis Award",
  "中国机械行业卓越工程师教育联盟第八届“精雕杯”毕业设计大赛铜奖": "Bronze Award, 8th Jingdiao Cup Graduation Design Competition of the China Mechanical Industry Excellent Engineer Education Alliance",
  "西安交通大学优秀硕士学位论文": "Outstanding Master's Thesis, Xi'an Jiaotong University",
  "社会任职 · 青年编委": "Academic Service · Young Editorial Board Member",
  "社会任职 · 编辑任职": "Academic Service · Editorial Role",
  "社会任职 · 科技服务": "Academic Service · Technology Service",
  "社会任职 · 学术组织": "Academic Service · Academic Organization",
  "SmartBot 青年编委": "Young Editorial Board Member, SmartBot",
  "南航学报（自科版、英文版）青年编委": "Young Editorial Board Member, Journal of Nanjing University of Aeronautics and Astronautics (Chinese and English editions)",
  "西安交通大学学报（EI，核心）青年编委": "Young Editorial Board Member, Journal of Xi'an Jiaotong University",
  "应用基础与工程科学学报（EI，核心）青年编委": "Young Editorial Board Member, Journal of Basic Science and Engineering",
  "Biomimetic Intelligence and Robotics（ESCI）青年编委": "Young Editorial Board Member, Biomimetic Intelligence and Robotics",
  "International Journal of Advanced Robotic Systems 副主编": "Associate Editor, International Journal of Advanced Robotic Systems",
  "江苏省科技副总": "Jiangsu Provincial Science and Technology Deputy General Manager",
  "第六届 IFToMM 中国委员会委员": "Member, 6th IFToMM China Committee",
  "Soft Science（ESCI）青年编委": "Young Editorial Board Member, Soft Science",
  "联系方式": "Contact",
  "欢迎围绕高端装备智能检修机器人、软体/连续体机器人、智能传感、航空发动机健康管理和 AI for Science 开展交流合作。": "We welcome collaboration on intelligent maintenance robotics for advanced equipment, soft/continuum robots, intelligent sensing, aero-engine health management, and AI for Science.",
  "扫码访问团队主页": "Scan to visit the team site",
  "浏览量": "Page Views",
  "访客数": "Visitors",
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

function translateAttributes(language) {
  attributeTranslations.forEach(({ selector, attribute, zh, en }) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.setAttribute(attribute, language === "en" ? en : zh);
    });
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
  translateAttributes(language);
  document.title = translations[language]["meta.ogTitle"];
  metaDescription?.setAttribute("content", translations[language]["meta.description"]);
  ogTitle?.setAttribute("content", translations[language]["meta.ogTitle"]);
  ogDescription?.setAttribute("content", translations[language]["meta.ogDescription"]);

  if (languageLabel) {
    languageLabel.textContent = language === "en" ? "ZH" : "EN";
  }
  languageButton?.setAttribute("aria-pressed", String(language === "en"));
}

function applyFilter(buttons, items, buttonAttr, itemAttr, selected) {
  buttons.forEach((button) => {
    const buttonValue = button.dataset[buttonAttr];
    const isPaperButtonGroup = button.dataset.outputRoot === "paper" && selected?.startsWith("paper");
    const isPatentButtonGroup = button.dataset.outputRoot === "patent" && selected?.startsWith("patent");
    const isAwardButtonGroup = button.dataset.outputRoot === "award" && selected?.startsWith("award");
    const isActive = buttonValue === selected || isPaperButtonGroup;
    button.classList.toggle("active", isActive || isPatentButtonGroup || isAwardButtonGroup);
    if (button.getAttribute("role") === "tab") {
      button.setAttribute("aria-selected", String(isActive || isPatentButtonGroup || isAwardButtonGroup));
    }
  });

  items.forEach((item) => {
    const itemValue = item.dataset[itemAttr];
    const isPaperGroup = selected === "paper" && itemValue?.startsWith("paper");
    const isPatentGroup = selected === "patent" && itemValue?.startsWith("patent");
    const isAwardGroup = selected === "award" && itemValue?.startsWith("award");
    const isProjectGroup = selected === "project" && itemValue?.startsWith("project");
    const isServiceGroup = selected === "service" && itemValue?.startsWith("service");
    item.hidden = selected !== "all" && itemValue !== selected && !isPaperGroup && !isPatentGroup && !isAwardGroup && !isProjectGroup && !isServiceGroup;
  });
}

function showOutputCategory(selected) {
  const isPaperSelection = selected?.startsWith("paper");
  const isPatentSelection = selected?.startsWith("patent");
  const isAwardSelection = selected?.startsWith("award");
  if (paperSubfilters) {
    paperSubfilters.hidden = !isPaperSelection;
  }
  if (patentSubfilters) {
    patentSubfilters.hidden = !isPatentSelection;
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

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
    "meta.description": "西安交通大学非攻机器人实验室，面向航空发动机等高端装备，发展少拆解、少损伤、少停机的在位具身智能机器人。",
    "meta.ogTitle": "非攻机器人实验室 | 西安交通大学",
    "meta.ogDescription": "面向航空发动机等高端装备，开展智能诊断、原位介入、具身操作、智能传感与健康管理研究。",
    "brand.title": "非攻机器人实验室",
    "brand.unit": "西安交通大学 · 机械工程学院",
    "nav.home": "首页",
    "nav.welcome": "欢迎页",
    "nav.about": "实验室简介",
    "nav.research": "研究方向",
    "nav.news": "团队动态",
    "nav.blog": "团队札记",
    "nav.members": "团队成员",
    "nav.achievements": "团队成果",
    "nav.contact": "联系方式",
    "hero.title": "非攻机器人实验室",
    "hero.subtitle": "取“非攻”一器多形之巧，造因境而变、入微而作的具身智能机器人。实验室面向航空发动机等高端装备内部深腔、狭窄通道和复杂曲面损伤，发展智能诊断、原位介入与具身操作机器人，让装备维护从大拆大修走向少拆解、少损伤、少停机的在位微创处置。",
    "hero.meta.continuum": "软体/连续体机器人",
    "hero.meta.crawling": "爬行机器人",
    "hero.meta.embodied": "具身智能",
    "hero.meta.dexterous": "灵巧操作",
    "hero.meta.tactile": "触觉传感",
    "hero.cta.research": "查看研究主线",
    "hero.cta.contact": "联系团队",
    "hero.facts.leader.label": "团队负责人",
    "hero.facts.leader.value": "杨来浩 副研究员",
    "hero.facts.unit.label": "依托单位",
    "hero.facts.unit.value": "西安交通大学机械工程学院",
    "hero.facts.outputs.label": "成果规模",
    "hero.facts.outputs.value": "论文 100+ / 专利 100+",
    "welcome.eyebrow": "Welcome",
    "welcome.title": "欢迎页",
    "welcome.note": "从实验室使命、近期亮点工作与媒体报道进入非攻机器人实验室。",
    "welcome.manifesto.tag": "Lab Compass",
    "welcome.manifesto.title": "造因境而变、入微而作的具身智能机器人",
    "welcome.manifesto.body": "实验室将“一器多形、因境而变、入微而作”的机构学寓意转化为具身智能机器人能力，面向航空发动机等高端装备内部深腔、狭窄通道和复杂曲面损伤，发展软体/连续体机器人、爬行机器人、触觉传感与灵巧操作，让机器人在受限空间里完成感知、进入、接触和处置，以尽量少拆解、少损伤、少停机的方式完成高端装备在位诊断、进入和维护。",
    "welcome.metrics.threads": "研究主线",
    "welcome.metrics.papers": "论文",
    "welcome.metrics.patents": "专利",
    "welcome.spotlight.tag": "Recent Focus",
    "welcome.spotlight.title": "近期亮点工作",
    "welcome.spotlight.torque": "扭矩触觉驱动灵巧操作",
    "welcome.spotlight.continuum": "接触辅助连续体机器人",
    "welcome.spotlight.jumper": "双稳态昆虫尺度跳跃机器人",
    "welcome.report.label": "亮点报道",
    "welcome.report.cctv": "聚焦蛇形机器人在航空发动机复杂腔道检测中的应用前景。",
    "welcome.report.silk": "呈现团队“刚柔并济”的高端装备智能检修探索。",
    "welcome.report.shaanxi": "展示蛇形机器人等面向原位检测与维护的机器人系统。",
    "blog.eyebrow": "Lab Notes",
    "blog.intro": "以重要新闻、论文发表与奖励为主，自动从团队动态和成果列表中抽取最新条目，并配合图文、视频素材展示。",
    "blog.feature.tag": "Latest Note",
    "blog.feature.title": "从期刊任职到青年科学家论坛：近期学术服务与交流",
    "blog.feature.body": "团队近期围绕机器人具身智能、高端装备原位检修和触觉灵巧操作开展多场学术交流，并继续参与 IEEE Sensors Reviews 等学术共同体建设。",
    "blog.feature.action": "查看团队动态",
    "blog.timeline.forum.title": "青年科学家论坛特邀报告",
    "blog.timeline.forum.body": "围绕航空发动机原位检测与维修机器人系统展开交流。",
    "blog.timeline.science.title": "触觉传感与灵巧操作研究进展",
    "blog.timeline.science.body": "扭矩触觉相关工作发表于 Science Advances。",
    "blog.timeline.award.title": "振动工程基础研究获奖",
    "blog.timeline.award.body": "团队牵头、联合重庆大学获中国振动工程学会科学技术奖基础研究类二等奖。",
    "blog.discussion.tag": "Open Desk",
    "blog.discussion.body": "这里保留公开交流入口，适合讨论论文复现、机器人系统设计、媒体采访和合作线索。涉及个人隐私或未公开合作内容，请优先邮件联系。",
    "blog.discussion.admission": "招生咨询",
    "blog.discussion.collab": "合作交流",
    "blog.discussion.reproduction": "论文复现",
    "blog.discussion.robotics": "机器人系统",
    "blog.discussion.awards": "奖励与报道",
    "blog.discussion.media": "媒体采访",
    "blog.discussion.public": "公开讨论入口",
    "blog.discussion.email": "邮件联系",
  },
  en: {
    "meta.description": "Feigong Robotics Laboratory at Xi'an Jiaotong University develops in-situ embodied intelligent robots for advanced equipment with less disassembly, less damage, and less downtime.",
    "meta.ogTitle": "Feigong Robotics Laboratory | Xi'an Jiaotong University",
    "meta.ogDescription": "Research on intelligent diagnosis, in-situ intervention, embodied manipulation, intelligent sensing, and health management for aero-engines and other advanced equipment.",
    "brand.title": "Feigong Robotics Laboratory",
    "brand.unit": "Xi'an Jiaotong University · School of Mechanical Engineering",
    "nav.home": "Home",
    "nav.welcome": "Welcome",
    "nav.about": "About",
    "nav.research": "Research",
    "nav.news": "News",
    "nav.blog": "Lab Notes",
    "nav.members": "People",
    "nav.achievements": "Outputs",
    "nav.contact": "Contact",
    "hero.title": "Feigong Robotics Laboratory",
    "hero.subtitle": "Inspired by Feigong's ingenuity of one device taking many forms, the lab builds embodied intelligent robots that adapt to their environment and work at fine scale. For deep cavities, narrow passages, and damaged complex surfaces inside aero-engines and other advanced equipment, the lab develops robots for intelligent diagnosis, in-situ intervention, and embodied manipulation, moving maintenance from major disassembly toward in-situ minimally invasive work with less disassembly, less damage, and less downtime.",
    "hero.meta.continuum": "Soft / Continuum Robotics",
    "hero.meta.crawling": "Crawling Robots",
    "hero.meta.embodied": "Embodied Intelligence",
    "hero.meta.dexterous": "Dexterous Manipulation",
    "hero.meta.tactile": "Tactile Sensing",
    "hero.cta.research": "Explore Research",
    "hero.cta.contact": "Contact Us",
    "hero.facts.leader.label": "Team Lead",
    "hero.facts.leader.value": "Laihao Yang, Associate Researcher",
    "hero.facts.unit.label": "Affiliation",
    "hero.facts.unit.value": "School of Mechanical Engineering, XJTU",
    "hero.facts.outputs.label": "Outputs",
    "hero.facts.outputs.value": "100+ papers / 100+ patents",
    "welcome.eyebrow": "Welcome",
    "welcome.title": "Welcome",
    "welcome.note": "Enter Feigong Robotics Laboratory through its mission, recent highlights, and featured media reports.",
    "welcome.manifesto.tag": "Lab Compass",
    "welcome.manifesto.title": "Embodied intelligent robots that adapt and work at fine scale",
    "welcome.manifesto.body": "The lab translates the mechanism ideas of multi-form structure, environment-responsive adaptation, and fine-scale operation into embodied intelligent robotic capabilities. For deep cavities, narrow passages, and damaged complex surfaces inside aero-engines and other advanced equipment, it develops soft/continuum robots, crawling robots, tactile sensing, and dexterous manipulation so robots can perceive, access, touch, and intervene in constrained spaces while completing in-situ diagnosis, access, and maintenance with as little disassembly, damage, and downtime as possible.",
    "welcome.metrics.threads": "Research Threads",
    "welcome.metrics.papers": "Papers",
    "welcome.metrics.patents": "Patents",
    "welcome.spotlight.tag": "Recent Focus",
    "welcome.spotlight.title": "Recent Highlights",
    "welcome.spotlight.torque": "Torque-enabled tactile dexterity",
    "welcome.spotlight.continuum": "Contact-aided continuum robot",
    "welcome.spotlight.jumper": "Bistable insect-scale jumper",
    "welcome.report.label": "Highlight Report",
    "welcome.report.cctv": "Focused on snake-like robots for inspecting complex aero-engine cavities.",
    "welcome.report.silk": "Presented the team's rigid-soft robotics exploration for intelligent maintenance of advanced equipment.",
    "welcome.report.shaanxi": "Showcased snake-like robots and robotic systems for in-situ inspection and maintenance.",
    "blog.eyebrow": "Lab Notes",
    "blog.intro": "Focused on important news, paper publications, and awards, this page automatically draws recent items from team news and outputs, with images and videos where available.",
    "blog.feature.tag": "Latest Note",
    "blog.feature.title": "From editorial service to the Youth Scientists Forum: recent academic service and exchange",
    "blog.feature.body": "The team recently held academic exchanges on robotic embodied intelligence, in-situ maintenance of advanced equipment, and tactile dexterous manipulation, while continuing to contribute to communities such as IEEE Sensors Reviews.",
    "blog.feature.action": "View Team News",
    "blog.timeline.forum.title": "Invited talk at the Youth Scientists Forum",
    "blog.timeline.forum.body": "Exchange on robotic systems for in-situ inspection and repair of aero-engines.",
    "blog.timeline.science.title": "Progress in tactile sensing and dexterous manipulation",
    "blog.timeline.science.body": "Torque-enabled tactile dexterity work was published in Science Advances.",
    "blog.timeline.award.title": "Award in basic research on vibration engineering",
    "blog.timeline.award.body": "The team, together with Chongqing University, won the second prize in basic research from the Chinese Society for Vibration Engineering.",
    "blog.discussion.tag": "Open Desk",
    "blog.discussion.body": "This open desk is for public discussion on paper reproduction, robotic system design, media interviews, and collaboration leads. For privacy-sensitive or unpublished collaborations, please use email first.",
    "blog.discussion.admission": "Admissions",
    "blog.discussion.collab": "Collaboration",
    "blog.discussion.reproduction": "Paper Reproduction",
    "blog.discussion.robotics": "Robotic Systems",
    "blog.discussion.awards": "Awards and Reports",
    "blog.discussion.media": "Media",
    "blog.discussion.public": "Public Discussion",
    "blog.discussion.email": "Email",
  },
};

const attributeTranslations = [
  { selector: ".brand", attribute: "aria-label", zh: "回到首页", en: "Back to home" },
  { selector: ".meta-list", attribute: "aria-label", zh: "团队概览", en: "Team overview" },
  { selector: ".hero-visual", attribute: "aria-label", zh: "团队研究图像", en: "Team research image" },
  { selector: ".welcome-metrics", attribute: "aria-label", zh: "欢迎页实验室概览", en: "Welcome page lab overview" },
  { selector: ".welcome-report-strip", attribute: "aria-label", zh: "欢迎页亮点报道", en: "Welcome page highlight reports" },
  { selector: ".note-timeline", attribute: "aria-label", zh: "团队札记时间线", en: "Lab Notes timeline" },
  { selector: "[data-lab-notes-feed]", attribute: "aria-label", zh: "团队札记动态流", en: "Lab Notes dynamic feed" },
  { selector: ".discussion-panel", attribute: "aria-label", zh: "开放讨论区", en: "Open discussion area" },
  { selector: '.hero-visual img[src="assets/team-profile.jpg"]', attribute: "alt", zh: "团队相关研究展示图", en: "Research showcase for the team" },
  { selector: '.leader-card img[src="assets/leader-yang.png"]', attribute: "alt", zh: "杨来浩副研究员照片", en: "Portrait of Associate Researcher Laihao Yang" },
  { selector: '.member-leader img[src="assets/leader-yang.png"]', attribute: "alt", zh: "杨来浩副研究员照片", en: "Portrait of Associate Researcher Laihao Yang" },
  { selector: '.research-tabs', attribute: "aria-label", zh: "研究方向切换", en: "Research direction switcher" },
  { selector: 'video[poster="assets/research-diagnosis.gif"]', attribute: "aria-label", zh: "智能诊断方向视频", en: "Intelligent diagnosis research video" },
  { selector: 'video[poster="assets/research-intervention.gif"]', attribute: "aria-label", zh: "原位介入方向视频", en: "In-situ intervention research video" },
  { selector: 'video[poster="assets/research-embodied.png"]', attribute: "aria-label", zh: "具身操作方向视频", en: "Embodied manipulation research video" },
  { selector: 'video[data-report-video="snrtv"]', attribute: "aria-label", zh: "陕西新闻联播报道视频", en: "Shaanxi News report video" },
  { selector: 'video[data-report-video="silk-road"]', attribute: "aria-label", zh: "陕西卫视丝路会客厅报道视频", en: "Shaanxi TV Silk Road Talk report video" },
  { selector: 'video[data-report-video="cctv"]', attribute: "aria-label", zh: "央视正午国防军事报道视频", en: "CCTV Noon Defense and Military report video" },
  { selector: 'video[data-paper-video="contact-aided-continuum"]', attribute: "aria-label", zh: "接触辅助连续体机器人论文视频", en: "Video for the contact-aided continuum robotic system paper" },
  { selector: 'video[data-paper-video="torque-dexterity"]', attribute: "aria-label", zh: "扭矩触觉灵巧操作论文视频", en: "Video for the torque-enabled robotic dexterity paper" },
  { selector: 'video[data-paper-video="bistable-jumper"]', attribute: "aria-label", zh: "双稳态昆虫尺度跳跃机器人论文视频", en: "Video for the bistable insect-scale jumper paper" },
  { selector: ".member-tabs", attribute: "aria-label", zh: "团队成员分组", en: "Team member groups" },
  { selector: ".output-primary-filters", attribute: "aria-label", zh: "成果一级板块", en: "Primary output categories" },
  { selector: "[data-paper-subfilters]", attribute: "aria-label", zh: "论文二级分类", en: "Publication subcategories" },
  { selector: "[data-patent-subfilters]", attribute: "aria-label", zh: "专利二级分类", en: "Patent subcategories" },
  { selector: "[data-award-subfilters]", attribute: "aria-label", zh: "获奖二级分类", en: "Award subcategories" },
  { selector: '.site-qr img', attribute: "alt", zh: "团队主页二维码", en: "QR code for the team website" },
  { selector: ".visitor-stats", attribute: "aria-label", zh: "站点访问统计", en: "Site visit statistics" },
];

const textTranslations = {
  "非攻机器人实验室": "Feigong Robotics Laboratory",
  "欢迎页": "Welcome",
  "团队札记": "Lab Notes",
  "开放讨论区": "Open Discussion",
  "实验室简介": "About the Lab",
  "团队简介": "About the Team",
  "取“非攻”一器多形之巧，造因境而变、入微而作的具身智能机器人。实验室面向航空发动机等高端装备内部深腔、狭窄通道和复杂曲面损伤，发展智能诊断、原位介入与具身操作机器人，让装备维护从大拆大修走向少拆解、少损伤、少停机的在位微创处置。": "Inspired by Feigong's ingenuity of one device taking many forms, the lab builds embodied intelligent robots that adapt to their environment and work at fine scale. The lab develops robots for intelligent diagnosis, in-situ intervention, and embodied manipulation in deep cavities, narrow passages, and damaged complex surfaces inside aero-engines and other advanced equipment, moving maintenance from major disassembly toward in-situ minimally invasive work with less disassembly, less damage, and less downtime.",
  "面向航空发动机等高端装备内部深腔、狭窄通道和复杂曲面损伤，团队构建“状态感知-原位进入-精准操作”一体化智能检修机器人体系，让装备维护从外部拆解走向在位、微创和智能化处置。": "For deep cavities, narrow passages, and damaged complex surfaces inside aero-engines and other advanced equipment, the team builds an integrated intelligent maintenance robotics system spanning condition awareness, in-situ access, and precision operation.",
  "团队负责人": "Team Lead",
  "杨来浩 副研究员": "Laihao Yang, Associate Researcher",
  "依托单位": "Affiliation",
  "西安交通大学机械工程学院": "School of Mechanical Engineering, Xi'an Jiaotong University",
  "论文 100+ / 专利 100+": "100+ papers / 100+ patents",
  "取“非攻”一器多形之巧，造因境而变、入微而作的具身智能机器人。实验室将“一器多形、因境而变、入微而作”的机构学寓意转化为高端装备智能检修能力：面向航空发动机、燃机、航天器等复杂装备内部深腔、狭窄通道、遮挡区域和复杂曲面损伤，发展可重构、柔顺、可感知、可操作的具身智能机器人系统，围绕智能诊断、原位介入、具身操作三条主线，让机器人在装备内部看得清、进得去、稳得住、修得准，以尽量少拆解、少损伤、少停机的方式完成在位诊断、进入和维护。": "Taking the ingenuity of Feigong as one device with many forms, the lab builds embodied intelligent robots that adapt to their environment and work at fine scale. It translates the mechanism ideas of multi-form structure, environment-responsive adaptation, and fine-scale operation into intelligent maintenance capabilities for advanced equipment: reconfigurable, compliant, perceptive, and operable embodied robotic systems for deep cavities, narrow passages, occluded regions, and complex-surface damage inside aero-engines, gas turbines, spacecraft, and other complex equipment. The lab focuses on intelligent diagnosis, in-situ intervention, and embodied manipulation so robots can perceive, enter, stabilize, and repair inside equipment with as little disassembly, damage, and downtime as possible.",
  "西安交通大学机械工程学院、航空发动机研究所。长期面向航空发动机健康管理、原位检修机器人、触觉感知与具身智能开展交叉研究，推动从装备状态识别、机器人进入到精细化维护的全链路技术落地。": "Based in the School of Mechanical Engineering and the Aero-engine Research Institute at Xi'an Jiaotong University, the team works across aero-engine health management, in-situ maintenance robotics, tactile perception, and embodied intelligence, advancing the full chain from condition recognition to robotic access and precision maintenance.",
  "学校主页": "XJTU Profile",
  "实验室使命": "Lab Mission",
  "团队使命": "Mission",
  "以尽量少拆解、少损伤、少停机的方式完成高端装备在位诊断、进入和维护。": "Complete in-situ diagnosis, access, and maintenance of advanced equipment with as little disassembly, damage, and downtime as possible.",
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
  "亮点报道": "Highlight Reports",
  "新闻": "News",
  "通知": "Notices",
  "西安交大：仿生机器人给高端装备“把脉问诊”": "Xi'an Jiaotong University: Biomimetic Robots Diagnose Advanced Equipment",
  "陕西新闻联播报道团队面向高端装备检修的仿生机器人研究，展示蛇形机器人等原位检测与维护能力。": "Shaanxi News reported the team's biomimetic robotics research for advanced equipment maintenance, including snake-like robots for in-situ inspection and maintenance.",
  "陕西新闻联播报道团队仿生机器人研究，展示面向高端装备原位检测与维护的机器人系统。": "Shaanxi News reported the team's biomimetic robotics research and robot systems for in-situ inspection and maintenance of advanced equipment.",
  "《丝路新周刊》节目预告 | 西安交大：用新型仿生机器人给高端装备“把脉问诊”": "Silk Road Weekly Preview | Xi'an Jiaotong University Uses New Biomimetic Robots to Diagnose Advanced Equipment",
  "陕西卫视《丝路新周刊》走进西安交通大学机械学院实验室，报道团队仿生机器人“刚柔并济”的高端装备检修探索。": "Shaanxi TV's Silk Road Weekly visited the School of Mechanical Engineering laboratory at Xi'an Jiaotong University and reported the team's rigid-soft biomimetic robotics work for advanced equipment maintenance.",
  "陕西卫视《丝路新周刊》预告报道团队新型仿生机器人研究，聚焦高端装备检测维护场景。": "Shaanxi TV's Silk Road Weekly previewed the team's new biomimetic robotics research for advanced equipment inspection and maintenance.",
  "【央视正午国防军事】报道西安交通大学团队攻克“卡脖子”难题": "CCTV Noon Defense and Military Reported Xi'an Jiaotong University Team Tackling Critical Bottleneck Problems",
  "央视正午国防军事报道西安交大团队仿生机器人研究，介绍蛇形机器人在航空发动机复杂腔道检测中的应用前景。": "CCTV Noon Defense and Military reported the XJTU team's biomimetic robotics research, including the prospects of snake-like robots for inspecting complex aero-engine cavities.",
  "央视正午国防军事报道西安交大团队仿生机器人研究，杨来浩介绍蛇形机器人未来可用于发动机复杂腔道检测。": "CCTV Noon Defense and Military reported the XJTU team's biomimetic robotics research; Laihao Yang explained how snake-like robots can be used for future inspection of complex engine cavities.",
  "杨来浩受邀在 UNIfied 2026-SMMI 青年科学家论坛作报告": "Laihao Yang Invited to Speak at the UNIfied 2026-SMMI Youth Scientists Forum",
  "2026 年 5 月 13 日，杨来浩受邀参加 2026 International Conference on Advanced Sensing, Condition Monitoring, and Intelligent Maintenance Innovations（UNIfied 2026-SMMI）青年科学家论坛，并作特邀报告“面向航空发动机原位检测与维修的机器人系统（Robotic Systems for In-Situ Inspection and Repair of Aero-Engines）”。": "On May 13, 2026, Laihao Yang was invited to the Youth Scientists Forum of the 2026 International Conference on Advanced Sensing, Condition Monitoring, and Intelligent Maintenance Innovations (UNIfied 2026-SMMI), and delivered the invited talk \"Robotic Systems for In-Situ Inspection and Repair of Aero-Engines.\"",
  "杨来浩受邀担任 IEEE Sensors Reviews Associate Editor": "Laihao Yang Invited to Serve as Associate Editor of IEEE Sensors Reviews",
  "根据 IEEE Sensors Reviews 主编 Eui-Hyeok Yang 的邀请函，杨来浩受邀担任 IEEE Sensors Reviews Associate Editor，初始任期一年，将参与期刊稿件评审组织与编委会工作。": "According to an invitation letter from IEEE Sensors Reviews Editor-in-Chief Eui-Hyeok Yang, Laihao Yang was invited to serve as an Associate Editor of IEEE Sensors Reviews for an initial one-year term, contributing to manuscript review coordination and the editorial board.",
  "杨来浩受邀赴深圳大学作机器人具身智能学术讲座": "Laihao Yang Invited to Shenzhen University for an Academic Lecture on Robotic Embodied Intelligence",
  "杨来浩受邀赴深圳大学机电与控制工程学院，作“机器人具身智能赋能高端装备智能运维”学术讲座。": "Laihao Yang was invited to the College of Mechatronics and Control Engineering at Shenzhen University to deliver an academic lecture titled \"Robotic Embodied Intelligence Empowers Intelligent Operation and Maintenance of Advanced Equipment.\"",
  "杨来浩受邀赴重庆交通大学航空学院作前沿微课讲座": "Laihao Yang Invited to Chongqing Jiaotong University School of Aeronautics for a Frontier Micro-lecture",
  "杨来浩受邀赴重庆交通大学航空学院，作“多模式软体机器人及航空航天应用”前沿微课讲座。": "Laihao Yang was invited to the School of Aeronautics at Chongqing Jiaotong University to deliver a frontier micro-lecture titled \"Multimodal Soft Robots and Aerospace Applications.\"",
  "杨来浩副研究员获首届“太行杯”航空动力创新大赛优胜奖": "Associate Researcher Laihao Yang received the Merit Award at the 1st Taihang Cup Aviation Power Innovation Competition",
  "杨来浩副研究员获首届“太行杯”航空动力创新大赛优胜奖，团队航空动力创新工作再获认可。": "Associate Researcher Laihao Yang received the Merit Award at the 1st Taihang Cup Aviation Power Innovation Competition, marking further recognition of the team's aviation power innovation work.",
  "团队关于触觉传感和灵巧操作的研究工作发表于Science 子刊（Science Advances）": "The team's work on tactile sensing and dexterous manipulation was published in Science Advances",
  "团队在触觉传感与灵巧操作方向取得进展，相关研究发表于 Science Advances。": "The team made progress in tactile sensing and dexterous manipulation, with the work published in Science Advances.",
  "杨来浩副研究员入选SmartBot青年编委": "Associate Researcher Laihao Yang joined the SmartBot young editorial board",
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
  "欢迎新同学加入课题组": "Welcome to New Group Members",
  "孙瑜老师课题组发布新学期团队通知，欢迎新同学加入课题组。": "Prof. Yu Sun's group posted a new-semester team notice welcoming new students to the group.",
  "祝贺李应春、张天祥、孙宇轩、宁嘉嘉、刘乙雪同学硕士毕业": "Congratulations to Yingchun Li, Tianxiang Zhang, Yuxuan Sun, Jiajia Ning, and Yixue Liu on completing their master's degrees",
  "孙瑜老师课题组发布毕业通知，祝贺李应春、张天祥、孙宇轩、宁嘉嘉、刘乙雪同学硕士毕业。": "Prof. Yu Sun's group posted a graduation notice congratulating Yingchun Li, Tianxiang Zhang, Yuxuan Sun, Jiajia Ning, and Yixue Liu on completing their master's degrees.",
  "孙瑜老师课题组更新团队通知，欢迎 2024 年新同学加入。": "Prof. Yu Sun's group updated its team notices to welcome the 2024 cohort of new students.",
  "欢迎新同学加入团队": "Welcome to New Team Members",
  "杨来浩老师团队发布团队通知，欢迎新同学加入非攻机器人实验室。": "Prof. Laihao Yang's team posted a team notice welcoming new students to Feigong Robotics Laboratory.",
  "团队成员": "Team Members",
  "团队围绕高端装备智能检修机器人形成多层次人才培养体系，覆盖团队领导、教师/合作导师、博士后、博士研究生、硕士研究生、本科生和毕业生。": "The team has a multi-level training structure around intelligent maintenance robotics for advanced equipment, covering the team lead, faculty and collaborating mentors, postdocs, PhD students, master's students, undergraduates, and alumni.",
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
  "聚焦具身操作、机器人系统集成、物理智能诊断和 AI for Science 方法拓展；公开页面暂未列出博士后姓名。": "Focus areas include embodied manipulation, robotic system integration, physics-informed intelligent diagnosis, and AI for Science method development; no postdoctoral names are listed on the public page yet.",
  "博士研究生": "PhD Students",
  "杨浙帅": "Zheshuai Yang",
  "金若尘": "Ruochen Jin",
  "胡华辉": "Huahui Hu",
  "杜祖鹏": "Zupeng Du",
  "2020级 · 西安交通大学": "2020 cohort · Xi'an Jiaotong University",
  "2020级 · 山东大学": "2020 cohort · Shandong University",
  "2021级 · 华南理工": "2021 cohort · South China University of Technology",
  "2023级 · 重庆大学": "2023 cohort · Chongqing University",
  "深腔探入式检测机器人系统设计与控制方法": "Design and control methods for deep-cavity inspection robot systems",
  "航空发动机转子叶片可解释深度智能监测诊断": "Explainable deep intelligent monitoring and diagnosis of aero-engine rotor blades",
  "数字孪生驱动的转子叶片健康监测": "Digital-twin-driven health monitoring of rotor blades",
  "非结构化环境下仿生软体机器人柔顺操控": "Compliant control of biomimetic soft robots in unstructured environments",
  "硕士研究生": "Master's Students",
  "薛晨菲": "Chenfei Xue",
  "姚晨彧": "Chenyu Yao",
  "李昊钢": "Haogang Li",
  "李晨铭": "Chenming Li",
  "钱行健": "Xingjian Qian",
  "王怡博": "Yibo Wang",
  "张亚鹏": "Yapeng Zhang",
  "2023级 · 长安大学": "2023 cohort · Chang'an University",
  "2023级 · 合肥工业大学": "2023 cohort · Hefei University of Technology",
  "2024级 · 四川大学": "2024 cohort · Sichuan University",
  "2024级 · 东北大学": "2024 cohort · Northeastern University",
  "2024级 · 湖南大学": "2024 cohort · Hunan University",
  "2024级 · 华南理工大学": "2024 cohort · South China University of Technology",
  "2025级 · 湖南大学": "2025 cohort · Hunan University",
  "超冗余机器人动力学控制": "Dynamics control of hyper-redundant robots",
  "连续体机器人柔顺关节创新设计": "Innovative design of compliant joints for continuum robots",
  "连续体机器人动力学建模与控制": "Dynamics modeling and control of continuum robots",
  "主被动连续体机器人控制与传感": "Control and sensing of active-passive continuum robots",
  "连续体打磨机器人控制": "Control of continuum polishing robots",
  "插簧型连续体机器人设计与建模": "Design and modeling of spring-pin continuum robots",
  "本科生": "Undergraduates",
  "吕冠桥": "Guanqiao Lu",
  "2021级本科生": "2021 undergraduate",
  "水下仿生机器人": "Underwater biomimetic robots",
  "已毕业": "Alumni",
  "2025 · 硕士论文：折纸启发的磁性薄膜多维力触觉电子皮肤 · 毕业去向：比亚迪": "2025 · Master's thesis: Origami-inspired magnetic thin-film multidimensional force tactile electronic skin · Destination: BYD",
  "2025 · 硕士论文：多节连续体机器人控制策略研究与系统设计 · 毕业去向：华为": "2025 · Master's thesis: Control strategy and system design of multi-section continuum robots · Destination: Huawei",
  "2025 · 硕士论文：模型约束下数据驱动的转子叶片监测诊断研究 · 毕业去向：中广核": "2025 · Master's thesis: Model-constrained data-driven monitoring and diagnosis of rotor blades · Destination: CGN",
  "2025 · 硕士论文：连续体机器人优化设计与高效力学建模 · 毕业去向：南瑞继保": "2025 · Master's thesis: Optimal design and efficient mechanics modeling of continuum robots · Destination: NR Electric",
  "2024 · 硕士论文：超冗余连续型机器人高精度控制与运动规划方法研究 · 毕业去向：人本": "2024 · Master's thesis: High-precision control and motion planning for hyper-redundant continuum robots · Destination: C&U Group",
  "2024 · 硕士论文：基于非接触测量的航空发动机转子叶片在线监测研究 · 毕业去向：一飞院": "2024 · Master's thesis: Online monitoring of aero-engine rotor blades based on non-contact measurement · Destination: AVIC First Aircraft Institute",
  "2023 · 硕士论文：航空发动机原位检测双芯柱连续体机器人运动控制研究 · 毕业去向：中兴": "2023 · Master's thesis: Motion control of a dual-core continuum robot for in-situ aero-engine inspection · Destination: ZTE",
  "2022 · 硕士论文：基于数字孪生的航空发动机转子叶片裂纹监测诊断研究 · 毕业去向：西安618所": "2022 · Master's thesis: Digital-twin-based crack monitoring and diagnosis of aero-engine rotor blades · Destination: Xi'an 618 Institute",
  "2020 · 本科毕业设计：基于深度学习的冗余机器人位姿评估方法 · 毕业去向：本校直博": "2020 · Undergraduate thesis: Deep-learning-based pose evaluation method for redundant robots · Destination: Direct PhD at XJTU",
  "郑毅": "Yi Zheng",
  "罗旭良": "Xuliang Luo",
  "彭银冲": "Yinchong Peng",
  "杨冬": "Dong Yang",
  "兰雨": "Yu Lan",
  "庞丁": "Ding Pang",
  "徐露": "Lu Xu",
  "郭庆凯": "Qingkai Guo",
  "汪领": "Ling Wang",
  "梁浩峰": "Haofeng Liang",
  "王韵博": "Yunbo Wang",
  "任亨": "Heng Ren",
  "谢时雨": "Shiyu Xie",
  "赵子攀": "Zipan Zhao",
  "贾秀梅": "Xiumei Jia",
  "侯传鑫": "Chuanxin Hou",
  "李昊阳": "Haoyang Li",
  "杨建傲": "Jianao Yang",
  "唐骏元": "Junyuan Tang",
  "郭庆凯 · 软体驱动方向": "Qingkai Guo · Soft actuation",
  "汪领 · 触觉传感方向": "Ling Wang · Tactile sensing",
  "梁浩峰 · 粘附设计方向": "Haofeng Liang · Adhesion design",
  "王韵博 · 爬壁机器人方向": "Yunbo Wang · Wall-climbing robots",
  "任亨 · 结构设计方向": "Heng Ren · Structural design",
  "谢时雨 · 软体驱动方向": "Shiyu Xie · Soft actuation",
  "赵子攀 · 软体驱动方向": "Zipan Zhao · Soft actuation",
  "贾秀梅 · 智能运维方向": "Xiumei Jia · Intelligent operation and maintenance",
  "侯传鑫 · 触觉传感方向": "Chuanxin Hou · Tactile sensing",
  "李昊阳 · 灵巧手方向": "Haoyang Li · Dexterous hands",
  "杨建傲 · 触觉传感方向": "Jianao Yang · Tactile sensing",
  "唐骏元 · 软体驱动方向": "Junyuan Tang · Soft actuation",
  "王昊": "Hao Wang",
  "韩天瑞": "Tianrui Han",
  "李芷源": "Zhiyuan Li",
  "唐鑫": "Xin Tang",
  "赵州": "Zhou Zhao",
  "唐灵君": "Lingjun Tang",
  "吕宇欣": "Yuxin Lu",
  "王景": "Jing Wang",
  "李应春": "Yingchun Li",
  "张天祥": "Tianxiang Zhang",
  "孙宇轩": "Yuxuan Sun",
  "宁嘉嘉": "Jiajia Ning",
  "刘乙雪": "Yixue Liu",
  "王昊 · 硕士 · 2019级 · 中铁第一勘察设计院集团有限公司": "Hao Wang · Master's · 2019 cohort · China Railway First Survey and Design Institute Group Co., Ltd.",
  "韩天瑞 · 硕士 · 2020级 · 比亚迪汽车有限公司": "Tianrui Han · Master's · 2020 cohort · BYD Auto Co., Ltd.",
  "李芷源 · 硕士 · 2020级 · 中铁二院重庆勘察设计研究院有限责任公司": "Zhiyuan Li · Master's · 2020 cohort · CREEC Chongqing Survey, Design and Research Co., Ltd.",
  "唐鑫 · 硕士 · 2020级 · 比亚迪股份有限公司": "Xin Tang · Master's · 2020 cohort · BYD Co., Ltd.",
  "赵州 · 硕士 · 2020级 · 香港城市大学（攻读博士）": "Zhou Zhao · Master's · 2020 cohort · City University of Hong Kong (PhD study)",
  "唐灵君 · 硕士 · 2021级 · 施耐德电气（中国）有限公司上海分公司": "Lingjun Tang · Master's · 2021 cohort · Schneider Electric (China) Co., Ltd., Shanghai Branch",
  "吕宇欣 · 硕士 · 2021级 · 比亚迪汽车有限公司": "Yuxin Lu · Master's · 2021 cohort · BYD Auto Co., Ltd.",
  "李应春 · 硕士 · 2022级 · 比亚迪汽车有限公司": "Yingchun Li · Master's · 2022 cohort · BYD Auto Co., Ltd.",
  "张天祥 · 硕士 · 2022级 · 比亚迪汽车有限公司": "Tianxiang Zhang · Master's · 2022 cohort · BYD Auto Co., Ltd.",
  "孙宇轩 · 硕士 · 2022级 · 西安飞行自动控制研究所": "Yuxuan Sun · Master's · 2022 cohort · Xi'an Flight Automatic Control Research Institute",
  "宁嘉嘉 · 硕士 · 2022级 · 深圳市新凯来技术有限公司": "Jiajia Ning · Master's · 2022 cohort · Shenzhen SiCarrier Technology Co., Ltd.",
  "团队成果": "Team Outputs",
  "围绕高端装备智能检修机器人，团队形成了从项目牵引、论文发表、专利布局、专著出版到科技奖励和学术服务的成果体系。当前页面按公开资料整理代表性条目，并支持按成果类型快速筛选。": "Around intelligent maintenance robotics for advanced equipment, the team has built an output portfolio spanning funded projects, papers, patents, a monograph, awards, and academic service. This page organizes representative public entries and supports filtering by output type.",
  "团队主持国家自然科学基金项目 2 项、大科学装置培育项目等 10 余项，主持项目经费超过 3400 万；出版专著 1 部，发表 Science Advances、IEEE T-RO、Advanced Science、IEEE TMECH、MSSP、MMT、ND 等学术论文 100 余篇，其中一作/通讯 SCI 论文 34 篇；公开发明专利 100 余项，授权 50 项、国际专利 7 项。": "The team has led 10+ funded projects, including 2 National Natural Science Foundation of China projects and a large scientific facility cultivation project, with total led funding of over RMB 34 million. Its outputs include 1 monograph; 100+ papers in venues such as Science Advances, IEEE T-RO, Advanced Science, IEEE TMECH, MSSP, MMT, and ND, including 34 first-author or corresponding-author SCI papers; and 100+ published invention patents, including 50 granted patents and 7 international patents.",
  "论文与专著": "Papers and Book",
  "100余篇 / 1部": "100+ papers / 1 book",
  "发表高水平论文 100 余篇，其中一作/通讯 SCI 论文 34 篇，出版专著 1 部。": "100+ high-level papers, including 34 first-author or corresponding-author SCI papers, and 1 monograph.",
  "国家自然科学基金项目 2 项、大科学装置培育项目等，主持经费 3400 万+。": "10+ led projects, including 2 National Natural Science Foundation of China projects and a large scientific facility cultivation project, with total led funding of RMB 34M+.",
  "专利 100余项": "100+ patents",
  "公开发明专利 100 余项，授权 50 项，国际专利 7 项。": "100+ published invention patents, 50 granted patents, and 7 international patents.",
  "奖励与传播": "Awards and Visibility",
  "多项省部级/行业奖励": "Multiple provincial, ministerial, and industry awards",
  "获中国振动工程学会科学技术奖二等奖、陕西高校科技一等奖、机器人科学引领奖等，并被 CCTV7、China Daily、陕西新闻联播等报道。": "Recognized by the Chinese Society for Vibration Engineering Science and Technology Award, Shaanxi Higher Education Science and Technology Award, Robotics Science Leadership Award, and media coverage from CCTV7, China Daily, Shaanxi News, and others.",
  "项目": "Projects",
  "亮点成果": "Featured Outputs",
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
  "亮点成果 · IEEE Transactions on Robotics ·": "Featured Output · IEEE Transactions on Robotics ·",
  "亮点成果 · Science Advances ·": "Featured Output · Science Advances ·",
  "亮点成果 · Advanced Science ·": "Featured Output · Advanced Science ·",
  "A Novel Contact-Aided Continuum Robotic System: Design, Modeling, and Validation": "A Novel Contact-Aided Continuum Robotic System: Design, Modeling, and Validation",
  "Touching with torque enables human-level robotic dexterity": "Touching with torque enables human-level robotic dexterity",
  "Bistable Insect-Scale Jumpers with Tunable Energy Barriers for Multimodal Locomotion": "Bistable Insect-Scale Jumpers with Tunable Energy Barriers for Multimodal Locomotion",
  "接触辅助连续体机器人面向航空发动机等受限深腔，利用环境接触提升支撑、定位与通过能力，完成设计、建模和实验验证。": "This contact-aided continuum robotic system targets constrained deep cavities such as aero-engines, using environmental contact to improve support, localization, and traversal, with design, modeling, and experimental validation.",
  "扭矩触觉让机器人达到接近人类水平的灵巧操作，提出可感知接触扭矩的触觉反馈与操作策略，提升灵巧手抓取、转动和调姿能力。": "Torque-aware tactile feedback enables near human-level robotic dexterity, improving dexterous-hand grasping, rotation, and pose adjustment through contact torque perception and manipulation strategies.",
  "可调能垒双稳态跳跃机器人实现昆虫尺度多模态运动，通过可调能量势垒在跳跃、翻转和多地形移动之间切换。": "The bistable insect-scale jumper achieves multimodal locomotion by tuning energy barriers, switching among jumping, flipping, and locomotion across different terrains.",
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
  "工业微创手术：航空发动机原位检修连续体机器人技术及应用": "Industrial Minimally Invasive Surgery: Continuum Robot Technology and Applications for In-situ Aero-engine Maintenance",
  "子母式连续体机器人：设计、建模与验证": "Parent-child Continuum Robot: Design, Modeling, and Validation",
  "昆虫尺度多运动模式机器人研究进展与应用": "Research Progress and Applications of Insect-scale Multimodal Robots",
  "数字孪生框架下叶片裂纹稀疏定量诊断方法": "Sparse Quantitative Diagnosis Method for Blade Cracks under a Digital Twin Framework",
  "绳驱动超冗余连续体机器人全臂形闭环控制方法": "Whole-arm Shape Closed-loop Control Method for Cable-driven Hyper-redundant Continuum Robots",
  "发明专利": "Invention Patent",
  "发明专利 ·": "Invention Patent ·",
  "国际专利 · 美国 ·": "International Patent · United States ·",
  "中国专利 · 发明公开 ·": "Chinese Patent · Published Invention ·",
  "中国专利 · 发明授权 ·": "Chinese Patent · Granted Invention ·",
  "公开": "Published",
  "授权": "Granted",
  "一种基于微观接触力学模型的仿贝壳橡胶衬套设计方法": "Bio-inspired Rubber Bushing Design Method Based on a Microscopic Contact Mechanics Model",
  "航空发动机进气道叶片检测机器人及检测方法": "Aero-engine Intake Blade Inspection Robot and Inspection Method",
  "磁吸式同步爬壁免绕线机器人": "Magnetic Synchronous Wall-climbing Robot without Cable Winding",
  "基于残差神经网络的叶片固有频率辨识方法": "Blade Natural Frequency Identification Method Based on a Residual Neural Network",
  "磁吸爬壁机器人的缆绳主动脱离机构": "Active Cable-release Mechanism for a Magnetic Wall-climbing Robot",
  "一种智能控温轴承系统及其瞬态温度预测和定量调控方法": "Intelligent Temperature-control Bearing System and Transient Temperature Prediction and Regulation Method",
  "一种集成高精度力反馈的墨水直写设备": "Ink Direct-writing Device with Integrated High-precision Force Feedback",
  "一种刚柔耦合连续体机器人单元及连续体机器人": "Rigid-flexible Coupled Continuum Robot Unit and Continuum Robot",
  "一种重型货车底盘用复合材料衬套设计方法": "Composite Bushing Design Method for Heavy Truck Chassis",
  "一种自供电型智能滚动轴承和能量回收方法": "Self-powered Intelligent Rolling Bearing and Energy Recovery Method",
  "一种折纸驱动的多向运动微型爬壁机器人": "Origami-driven Multi-directional Miniature Wall-climbing Robot",
  "基于时频空间独立成分的Lamb波模态盲分离方法": "Blind Separation Method for Lamb Wave Modes Based on Time-frequency-spatial Independent Components",
  "三球销式柔性连续体机器人单元及连续体机器人": "Tripod Flexible Continuum Robot Unit and Continuum Robot",
  "一种基于折纸弯曲结构的负载气动探测臂": "Load-bearing Pneumatic Detection Arm Based on an Origami Bending Structure",
  "球笼式柔性变刚度连续体机器人单元及连续体机器人": "Birfield Flexible Variable-stiffness Continuum Robot Unit and Continuum Robot",
  "连续体机器人的优化控制方法": "Optimization Control Method for a Continuum Robot",
  "航空发动机剩余寿命预测方法": "Aero-engine Remaining Useful Life Prediction Method",
  "磁场可编程逆向设计方法、结构和电子设备及介质": "Magnetic-field Programmable Inverse Design Method, Structure, Electronic Device, and Medium",
  "电磁式触觉反馈装置及反馈方法": "Electromagnetic Tactile Feedback Device and Feedback Method",
  "多维力触觉感知电子皮肤及制备方法": "Multidimensional Force Tactile-sensing Electronic Skin and Preparation Method",
  "可跨面的粘附履带式爬壁机器人": "Adhesive Tracked Wall-climbing Robot Capable of Surface Transitions",
  "扭矩感知仿生夹爪": "Torque-sensing Biomimetic Gripper",
  "用于触觉反馈的HASEL软体致动器制备方法及致动器": "Preparation Method for HASEL Soft Actuators for Tactile Feedback and the Actuator",
  "正常样本聚合对比学习网络的齿轮箱变工况故障检测方法": "Gearbox Variable-condition Fault Detection Method Based on a Normal-sample Aggregation Contrastive Learning Network",
  "一种用于连续体机械臂的变刚度结构": "Variable-stiffness Structure for a Continuum Manipulator",
  "一种径向与轴向叶端定时传感器测量装置与方法": "Radial and Axial Blade Tip Timing Sensor Measurement Device and Method",
  "一种绳驱动的带虎口型欠驱动仿生灵巧手及其方法": "Cable-driven Underactuated Biomimetic Dexterous Hand with a Thumb-index Web Structure and Method",
  "一种叉簧片式双芯柱连续体机器人单元及机器人": "Fork-spring Dual-core-column Continuum Robot Unit and Robot",
  "一种轴承式双芯柱连续体机器人": "Bearing-type Dual-core-column Continuum Robot",
  "一种基于主动混叠与解混叠的信号频率识别方法": "Signal Frequency Identification Method Based on Active Aliasing and De-aliasing",
  "叶片振型函数特征值求解方法": "Method for Solving Eigenvalues of Blade Mode-shape Functions",
  "基于3D打印的Kresling类折纸结构制造工艺": "3D-printing-based Manufacturing Process for Kresling-like Origami Structures",
  "一种单一气源可控的双稳态嵌入折纸一体化多向执行器": "Single-air-source Controllable Bistable Embedded-origami Integrated Multidirectional Actuator",
  "一种线驱动连续体机械臂末端位置误差补偿方法": "End-position Error Compensation Method for a Cable-driven Continuum Manipulator",
  "基于时空图的核电循环水泵行星齿轮箱检测方法": "Spatiotemporal-graph-based Detection Method for Planetary Gearboxes in Nuclear-power Circulating Water Pumps",
  "爬行翻滚双运动模式爬壁机器人及方法": "Wall-climbing Robot with Crawling and Rolling Modes and Method",
  "基于特征导向正则参数的旋转机械稀疏表示诊断方法": "Sparse-representation Diagnosis Method for Rotating Machinery Based on Feature-guided Regularization Parameters",
  "一种测试连续体机器人力学性能的方法和装置": "Method and Device for Testing Mechanical Performance of Continuum Robots",
  "基于最小方差功率谱估计的叶片固有频率识别方法": "Blade Natural Frequency Identification Method Based on Minimum-variance Power Spectrum Estimation",
  "一种连续体机器人的线缆布局方法": "Cable Layout Method for a Continuum Robot",
  "压扭触觉传感器及制备方法": "Pressure-torsion Tactile Sensor and Fabrication Method",
  "自解耦电磁式多维力触觉传感器": "Self-decoupled Electromagnetic Multidimensional Force Tactile Sensor",
  "基于电液耦合驱动的模块化折纸机器人及控制方法": "Modular Origami Robot Driven by Electro-hydraulic Coupling and Control Method",
  "柔性聚合物磁膜折纸化局部设计方法和柔性力敏传感器": "Origami-based Local Design Method for Flexible Polymer Magnetic Films and Flexible Force-sensitive Sensor",
  "多维度触觉感知仿人灵巧手": "Multidimensional Tactile-sensing Humanoid Dexterous Hand",
  "连续体机器人的静力学控制方法": "Statics Control Method for a Continuum Robot",
  "基于时域图卷积网络的核电循环水泵行星齿轮箱检测方法": "Planetary Gearbox Detection Method for Nuclear Power Circulating Water Pumps Based on a Time-domain Graph Convolutional Network",
  "基于折纸结构的多向爬壁机器人": "Multidirectional Wall-climbing Robot Based on an Origami Structure",
  "矢量推力式机器人": "Vector-thrust Robot",
  "一种剪纸启发的各向异性可控粘附结构及其应用": "Paper-cutting-inspired Anisotropic Controllable Adhesion Structure and Its Application",
  "一种航空发动机孔探检测的连续体机器人系统": "Continuum Robot System for Aero-engine Borescope Inspection",
  "多传感融合的齿轮故障诊断方法": "Gear Fault Diagnosis Method Based on Multi-sensor Fusion",
  "一种航空发动机叶片原位打磨设备": "In-situ Grinding Device for Aero-engine Blades",
  "基于连续压缩感知的叶端定时信号无网格频谱估计方法": "Gridless Spectrum Estimation Method for Blade Tip Timing Signals Based on Continuous Compressed Sensing",
  "线驱动连续体机器人的绳-孔摩擦系数测定装置及方法": "Device and Method for Measuring the Cable-hole Friction Coefficient of a Cable-driven Continuum Robot",
  "一种线驱动连续体机器人的静态运动建模方法": "Static Motion Modeling Method for a Cable-driven Continuum Robot",
  "一种内啮合直齿轮磨损下的啮合刚度的建模方法": "Modeling Method for Mesh Stiffness of Worn Internal Spur Gears",
  "一种外啮合直齿轮磨损下的啮合刚度的建模方法": "Modeling Method for Mesh Stiffness of Worn External Spur Gears",
  "机动飞行条件下航空发动机主轴承动力学分析方法及系统": "Aero-engine Main-bearing Dynamics Analysis Method and System under Maneuvering Flight Conditions",
  "机动飞行状态下弹性支承结构振动响应分析方法及系统": "Vibration-response Analysis Method and System for Elastic Support Structures under Maneuvering Flight Conditions",
  "一种磁控软体机器人磁性颗粒分布的预测方法": "Prediction Method for Magnetic Particle Distribution in Magnetically Controlled Soft Robots",
  "一种新型磁敏式触觉多维力传感器": "Novel Magnetically Sensitive Tactile Multidimensional Force Sensor",
  "一种基于磁敏多维力传感器的信号分类方法": "Signal Classification Method Based on a Magnetically Sensitive Multidimensional Force Sensor",
  "一种可升降式变刚度柔性连续体机器人": "Liftable Variable-stiffness Flexible Continuum Robot",
  "检测航空发动机叶片的爬行机器人": "Crawling Robot for Inspecting Aero-engine Blades",
  "一种磁控软体传感机器人": "Magnetically Controlled Soft Sensing Robot",
  "多相合金的多尺度建模方法": "Multiscale Modeling Method for Multiphase Alloys",
  "一种基于全聚焦的Lamb波相位成像方法": "Lamb Wave Phase Imaging Method Based on Total Focusing",
  "一种转子叶片气动载荷模拟装置与方法": "Device and Method for Simulating Aerodynamic Loads on Rotor Blades",
  "一种传感器静态标定装置及标定方法": "Sensor Static Calibration Device and Calibration Method",
  "一种非冗余的信号欠采样及频谱恢复方法": "Non-redundant Signal Undersampling and Spectrum Recovery Method",
  "一种涡轮转子喘振模拟装置": "Turbine Rotor Surge Simulation Device",
  "一种叶片裂纹监测系统": "Blade Crack Monitoring System",
  "一种传感器动态标定装置及标定方法": "Sensor Dynamic Calibration Device and Calibration Method",
  "一种连续体机械臂重建方法": "Reconstruction Method for a Continuum Manipulator",
  "一种基于编码时域卷积的航空发动机异常检测方法": "Aero-engine Anomaly Detection Method Based on Encoded Temporal Convolution",
  "一种基于故障特征频率的航空发动机异常检测方法": "Aero-engine Anomaly Detection Method Based on Fault Characteristic Frequencies",
  "一种线驱动连续体机械臂末端位姿定位系统及方法": "End-effector Pose Positioning System and Method for a Cable-driven Continuum Manipulator",
  "基于单个叶端定时传感器的叶片固有频率识别方法": "Blade Natural Frequency Identification Method Based on a Single Blade Tip Timing Sensor",
  "基于混合响应的柔性电容传感器及其制备方法和应用": "Flexible Capacitive Sensor Based on Hybrid Response and Its Fabrication Method and Application",
  "一种粘附-脱附装置": "Adhesion-detachment Device",
  "单个或均布叶端定时传感器提取叶片间固有频率差值方法": "Method for Extracting Natural Frequency Differences between Blades Using a Single or Uniformly Distributed Blade Tip Timing Sensors",
  "基于单个叶端定时传感器的叶片检测方法": "Blade Detection Method Based on a Single Blade Tip Timing Sensor",
  "数字孪生驱动的航空发动机旋转叶片裂纹定量识别方法": "Digital Twin-driven Quantitative Crack Identification Method for Rotating Aero-engine Blades",
  "基于多个叶端定时传感器的叶片检测方法": "Blade Detection Method Based on Multiple Blade Tip Timing Sensors",
  "一种柔性电容传感器及其制备方法": "Flexible Capacitive Sensor and Fabrication Method",
  "单个叶端定时传感器的叶片固有频率检测方法": "Blade Natural Frequency Detection Method Using a Single Blade Tip Timing Sensor",
  "基于叶端定时传感器提取叶片间固有频率差值方法": "Method for Extracting Natural Frequency Differences between Blades Based on Blade Tip Timing Sensors",
  "一种基于多个叶端定时传感器的叶片固有频率识别方法": "Blade Natural Frequency Identification Method Based on Multiple Blade Tip Timing Sensors",
  "基于多个叶端定时传感器的叶片间固有频率差值提取方法": "Method for Extracting Natural Frequency Differences between Blades Based on Multiple Blade Tip Timing Sensors",
  "一种线驱动连续体机器人的电控系统": "Electronic Control System for a Cable-driven Continuum Robot",
  "一种线驱动连续体机器人的驱动机构": "Drive Mechanism for a Cable-driven Continuum Robot",
  "一种线驱动连续体机器人": "Cable-driven Continuum Robot",
  "一种线驱动连续体柔性机器人": "Cable-driven Flexible Continuum Robot",
  "一种旋转叶片位移场反演重构方法及其系统": "Inversion and Reconstruction Method and System for Rotating Blade Displacement Fields",
  "一种基于叶端定时的转子叶片动应变场测量方法及其系统": "Dynamic Strain Field Measurement Method and System for Rotor Blades Based on Blade Tip Timing",
  "申请日": "Filed",
  "公开日": "Published",
  "授权日": "Granted",
  "西安交通大学": "Xi'an Jiaotong University",
  "扬州大学": "Yangzhou University",
  "青岛空天动力结构安全研究所": "Qingdao Institute of Aerospace Power Structural Safety",
  "华电电力科学研究院有限公司": "Huadian Electric Power Research Institute Co., Ltd.",
  "希西维(江苏)精工股份有限公司": "CCVI (Jiangsu) Precision Industry Co., Ltd.",
  "希西维(江苏)精工股份有限公司; 扬州大学": "CCVI (Jiangsu) Precision Industry Co., Ltd.; Yangzhou University",
  "CN122087890A · 申请日 2026-02-10 · 公开日 2026-05-26 · 希西维(江苏)精工股份有限公司; 扬州大学": "CN122087890A · Filed 2026-02-10 · Published 2026-05-26 · CCVI (Jiangsu) Precision Industry Co., Ltd.; Yangzhou University",
  "CN116968041B · 申请日 2023-06-20 · 授权日 2026-05-12 · 西安交通大学": "CN116968041B · Filed 2023-06-20 · Granted 2026-05-12 · Xi'an Jiaotong University",
  "CN122009355A · 申请日 2026-01-14 · 公开日 2026-05-12 · 西安交通大学": "CN122009355A · Filed 2026-01-14 · Published 2026-05-12 · Xi'an Jiaotong University",
  "CN116050237B · 申请日 2022-09-29 · 授权日 2026-04-14 · 西安交通大学": "CN116050237B · Filed 2022-09-29 · Granted 2026-04-14 · Xi'an Jiaotong University",
  "CN121822016A · 申请日 2026-01-14 · 公开日 2026-04-10 · 西安交通大学": "CN121822016A · Filed 2026-01-14 · Published 2026-04-10 · Xi'an Jiaotong University",
  "CN121828345A · 申请日 2026-01-12 · 公开日 2026-04-10 · 扬州大学": "CN121828345A · Filed 2026-01-12 · Published 2026-04-10 · Yangzhou University",
  "CN121671005A · 申请日 2025-11-20 · 公开日 2026-03-17 · 西安交通大学": "CN121671005A · Filed 2025-11-20 · Published 2026-03-17 · Xi'an Jiaotong University",
  "CN118372284B · 申请日 2024-03-25 · 授权日 2026-03-03 · 西安交通大学": "CN118372284B · Filed 2024-03-25 · Granted 2026-03-03 · Xi'an Jiaotong University",
  "CN121439026A · 申请日 2025-10-20 · 公开日 2026-01-30 · 扬州大学": "CN121439026A · Filed 2025-10-20 · Published 2026-01-30 · Yangzhou University",
  "CN121408357A · 申请日 2025-11-28 · 公开日 2026-01-27 · 扬州大学": "CN121408357A · Filed 2025-11-28 · Published 2026-01-27 · Yangzhou University",
  "CN121375978A · 申请日 2025-11-05 · 公开日 2026-01-23 · 西安交通大学": "CN121375978A · Filed 2025-11-05 · Published 2026-01-23 · Xi'an Jiaotong University",
  "CN116796148B · 申请日 2023-06-06 · 授权日 2026-01-06 · 西安交通大学": "CN116796148B · Filed 2023-06-06 · Granted 2026-01-06 · Xi'an Jiaotong University",
  "CN118181344B · 申请日 2024-03-25 · 授权日 2026-01-06 · 西安交通大学": "CN118181344B · Filed 2024-03-25 · Granted 2026-01-06 · Xi'an Jiaotong University",
  "CN116460891B · 申请日 2023-04-11 · 授权日 2026-01-02 · 西安交通大学": "CN116460891B · Filed 2023-04-11 · Granted 2026-01-02 · Xi'an Jiaotong University",
  "CN118528312B · 申请日 2024-03-25 · 授权日 2025-12-02 · 西安交通大学": "CN118528312B · Filed 2024-03-25 · Granted 2025-12-02 · Xi'an Jiaotong University",
  "CN119077725B · 申请日 2024-08-01 · 授权日 2025-12-02 · 西安交通大学": "CN119077725B · Filed 2024-08-01 · Granted 2025-12-02 · Xi'an Jiaotong University",
  "CN119334645B · 申请日 2024-09-11 · 授权日 2025-12-02 · 西安交通大学": "CN119334645B · Filed 2024-09-11 · Granted 2025-12-02 · Xi'an Jiaotong University",
  "CN119124405B · 申请日 2024-08-08 · 授权日 2025-11-28 · 西安交通大学": "CN119124405B · Filed 2024-08-08 · Granted 2025-11-28 · Xi'an Jiaotong University",
  "CN119124435B · 申请日 2024-08-08 · 授权日 2025-11-28 · 西安交通大学": "CN119124435B · Filed 2024-08-08 · Granted 2025-11-28 · Xi'an Jiaotong University",
  "CN120134362B · 申请日 2025-03-11 · 授权日 2025-11-21 · 西安交通大学": "CN120134362B · Filed 2025-03-11 · Granted 2025-11-21 · Xi'an Jiaotong University",
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

const patentAssigneeTranslations = {
  "华电电力科学研究院有限公司": "Huadian Electric Power Research Institute Co., Ltd.",
  "希西维(江苏)精工股份有限公司": "CCVI (Jiangsu) Precision Industry Co., Ltd.",
  "扬州大学": "Yangzhou University",
  "西安交通大学": "Xi'an Jiaotong University",
  "青岛空天动力结构安全研究所": "Qingdao Institute of Aerospace Power Structural Safety",
};

const achievementPhraseTranslations = {
  "亮点成果": "Featured Output",
  "SCI 期刊": "SCI Journal",
  "EI 期刊": "EI Journal",
  "EI 会议": "EI Conference",
  "预印本": "Preprint",
  "其他期刊": "Other Journal",
  "其他会议": "Other Conference",
  "中文期刊": "Chinese Journal",
  "项目": "Project",
  "国家自然科学基金": "National Natural Science Foundation of China",
  "纵向项目": "Government-funded project",
  "横向项目": "Industry-funded project",
  "链接": "Link",
  "申请日": "Filed",
  "公开日": "Published",
  "授权日": "Granted",
  "发明专利": "Invention Patent",
  "中国专利": "Chinese Patent",
  "发明公开": "Published Invention",
  "发明授权": "Granted Invention",
  "国际专利": "International Patent",
  "美国": "United States",
  "专著": "Monograph",
  "科学技术奖": "Science and Technology Award",
  "科技论文获奖": "Paper Award",
  "学生竞赛获奖": "Student Competition Award",
  "社会奖励": "Professional Award",
  "学位论文获奖": "Thesis Award",
  "社会任职": "Academic Service",
  "青年编委": "Young Editorial Board Member",
  "编辑任职": "Editorial Role",
  "科技服务": "Technology Service",
  "学术组织": "Academic Organization",
  "应用基础与工程科学学报": "Journal of Basic Science and Engineering",
  "机械工程学报": "Journal of Mechanical Engineering",
  "振动、测试与诊断": "Journal of Vibration, Measurement & Diagnosis",
  "自动化与信息工程": "Automation & Information Engineering",
  "西北工业大学出版社": "Northwestern Polytechnical University Press",
  "中国振动工程学会": "Chinese Society for Vibration Engineering",
  "陕西省": "Shaanxi Province",
  "西安交通大学": "Xi'an Jiaotong University",
  "杨来浩": "Laihao Yang",
  "孙瑜": "Yu Sun",
  "陈雪峰": "Xuefeng Chen",
  "杨浙帅": "Zheshuai Yang",
  "姚晨彧": "Chenyu Yao",
  "郭庆凯": "Qingkai Guo",
  "张天祥": "Tianxiang Zhang",
  "赵子攀": "Zipan Zhao",
  "谢时雨": "Shiyu Xie",
  "南长峰": "Changfeng Nan",
  "罗旭良": "Xuliang Luo",
  "杨志勃": "Zhibo Yang",
  "薛晨菲": "Chenfei Xue",
  "文庆": "Qing Wen",
  "阳淼清": "Miaoqing Yang",
  "刘洋": "Yang Liu",
  "陆凌云": "Lingyun Lu",
  "杨丹卉": "Danhui Yang",
  "彭银冲": "Yinchong Peng",
  "杜祖鹏": "Zupeng Du",
  "郑毅": "Yi Zheng",
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

function translatePatentMetadata(text) {
  const parts = text.split(" · ");
  if (parts.length < 4 || !/^CN\d+[A-Z]\d?$/.test(parts[0])) return "";

  const translatedParts = parts.map((part, index) => {
    if (index === 0) return part;

    const dateMatch = part.match(/^(申请日|公开日|授权日) (\d{4}-\d{2}-\d{2})$/);
    if (dateMatch) {
      return `${textTranslations[dateMatch[1]]} ${dateMatch[2]}`;
    }

    const assignees = part.split(/[;；]/).map((assignee) => assignee.trim()).filter(Boolean);
    if (assignees.length) {
      return assignees.map((assignee) => patentAssigneeTranslations[assignee] || assignee).join("; ");
    }

    return part;
  });

  return translatedParts.join(" · ");
}

function replaceAchievementPhrases(text) {
  return Object.entries(achievementPhraseTranslations)
    .sort(([first], [second]) => second.length - first.length)
    .reduce((value, [source, target]) => value.split(source).join(target), text)
    .replace(/（/g, " (")
    .replace(/）/g, ")")
    .replace(/、/g, ", ");
}

function translateAchievementText(text, node) {
  const achievement = node.parentElement?.closest(".achievement");
  if (!achievement) return "";

  const translated = replaceAchievementPhrases(text);
  return translated !== text ? translated : "";
}

function fallbackEnglishText(text, node) {
  const parent = node.parentElement;
  if (parent?.closest(".achievement")) return stripChinese(text) || text;
  if (parent?.closest(".member-category")) return "Team member information";
  if (parent?.closest(".news-card")) return "Team news";
  if (parent?.closest(".info-card")) return "Team profile";
  return stripChinese(text) || "Team information";
}

function translateOriginalText(original, node) {
  const trimmed = original.replace(/\s+/g, " ").trim();
  if (!trimmed || !/[\u3400-\u9fff]/.test(trimmed)) return original;
  const translated = textTranslations[trimmed] || translatePatentMetadata(trimmed) || translateAchievementText(trimmed, node) || fallbackEnglishText(trimmed, node);
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

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textContent(element, selector) {
  return element.querySelector(selector)?.textContent?.replace(/\s+/g, " ").trim() || "";
}

function linkFor(element) {
  const link = element.querySelector("h3 a, .pub-actions a, a");
  return link?.getAttribute("href") || "";
}

function mediaFor(element) {
  const video = element.querySelector("video source");
  if (video?.getAttribute("src")) {
    return { type: "video", src: video.getAttribute("src") };
  }

  const image = element.querySelector("img");
  if (image?.getAttribute("src")) {
    return { type: "image", src: image.getAttribute("src") };
  }

  return { type: "image", src: "assets/team-profile.jpg" };
}

function itemFromArticle(element, type) {
  const title = textContent(element, "h3");
  const date = textContent(element, "time") || textContent(element, ".pub-year");
  const summary = textContent(element, ".pub-body > p:last-child") || textContent(element, "p:not(.news-type):not(.pub-venue):not(.project-tag)") || textContent(element, ".pub-venue");
  const href = linkFor(element);
  return {
    type,
    title,
    date,
    summary,
    href,
    media: mediaFor(element),
  };
}

function renderMedia(media) {
  if (!media?.src) return "";
  if (media.type === "video") {
    return `
      <figure class="note-card-media">
        <video controls controlslist="nodownload" oncontextmenu="return false" preload="metadata" playsinline>
          <source src="${escapeHtml(media.src)}" type="video/mp4">
        </video>
      </figure>
    `;
  }

  return `
    <figure class="note-card-media">
      <img src="${escapeHtml(media.src)}" alt="" loading="lazy">
    </figure>
  `;
}

function renderLinkedTitle(item) {
  const title = escapeHtml(item.title);
  if (!item.href) return title;
  return `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${title}</a>`;
}

function renderDynamicWelcome() {
  document.querySelectorAll("[data-auto-source]").forEach((element) => {
    const count = document.querySelectorAll(element.dataset.autoSource).length;
    element.textContent = element.dataset.autoFormat === "plus" && count >= 90 ? `${Math.floor(count / 10) * 10}+` : String(count);
  });

  const highlightRoot = document.querySelector("[data-welcome-highlights]");
  if (highlightRoot) {
    const highlights = Array.from(document.querySelectorAll('article[data-output-type="highlight-output"]')).slice(0, 3).map((item) => itemFromArticle(item, "paper"));
    highlightRoot.innerHTML = highlights.map((item) => `
      <a href="#achievements">
        <span>${escapeHtml(item.date)}</span>
        <strong>${renderLinkedTitle(item)}</strong>
        <em>${escapeHtml(item.summary)}</em>
      </a>
    `).join("");
  }

  const reportRoot = document.querySelector("[data-welcome-reports]");
  if (reportRoot) {
    const reports = Array.from(document.querySelectorAll('article[data-news-type="highlight"]')).slice(0, 3).map((item) => itemFromArticle(item, "report"));
    reportRoot.innerHTML = reports.map((item) => `
      <article>
        <span>${currentLanguage === "en" ? "Highlight Report" : "亮点报道"}</span>
        <h3>${renderLinkedTitle(item)}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </article>
    `).join("");
  }
}

function renderLabNotesFeed() {
  const root = document.querySelector("[data-lab-notes-feed]");
  if (!root) return;

  const highlightReports = Array.from(document.querySelectorAll('article[data-news-type="highlight"]')).map((item) => itemFromArticle(item, "report"));
  const featuredPapers = Array.from(document.querySelectorAll('article[data-output-type="highlight-output"]')).map((item) => itemFromArticle(item, "paper"));
  const awards = Array.from(document.querySelectorAll('article[data-output-type^="award-"]')).slice(0, 5).map((item) => itemFromArticle(item, "award"));
  const importantNews = Array.from(document.querySelectorAll('article[data-news-type="news"]'))
    .map((item) => itemFromArticle(item, "news"))
    .filter((item) => /获|奖|发表于|报告|报道|担任|当选|Invited|Award|Published|Editor|Report/i.test(`${item.title} ${item.summary}`));

  const seen = new Set();
  const feed = [...featuredPapers, ...awards, ...importantNews, ...highlightReports]
    .filter((item) => item.title && !seen.has(item.title) && seen.add(item.title))
    .slice(0, 9);

  root.innerHTML = feed.map((item) => `
    <article class="note-card note-card-${escapeHtml(item.type)}">
      ${renderMedia(item.media)}
      <div class="note-card-body">
        <p class="project-tag">${escapeHtml(item.type === "paper" ? (currentLanguage === "en" ? "Paper" : "论文发表") : item.type === "award" ? (currentLanguage === "en" ? "Award" : "奖励") : item.type === "report" ? (currentLanguage === "en" ? "Report" : "报道") : (currentLanguage === "en" ? "News" : "新闻"))}</p>
        <time>${escapeHtml(item.date)}</time>
        <h3>${renderLinkedTitle(item)}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </div>
    </article>
  `).join("");
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
  renderDynamicWelcome();
  renderLabNotesFeed();
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
showOutputCategory("highlight-output");

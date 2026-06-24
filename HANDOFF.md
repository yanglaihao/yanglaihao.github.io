# HANDOFF

## 最新更新

更新时间：2026-06-24 08:07 CST

本文件已更新到当前项目状态。最新一轮已完成并部署：

- 参考机器人 / 具身智能实验室主页的组织方式，新增两个站内锚点页面：
  - `欢迎页 / Welcome`：位于首屏之后，集中展示实验室使命、近期亮点工作和三条亮点报道入口；版式为“实验室宣言 + 近期工作列表 + 媒体报道条”，避免把用户先带到纯导航页。
  - `团队札记 / Lab Notes`：位于团队动态之后，用于承接团队近期活动、开放交流和可公开讨论的问题；包含最新札记、活动时间线和“开放讨论区”，提供 GitHub Issues 公开讨论入口与邮件联系入口。英文主页已同步，新增区域在英文模式下无中文残留。
- 新增导航项“欢迎页”和“团队札记”；站点检查新增对两个页面锚点、英文翻译、公开讨论入口和样式类的校验。已用本地 Chrome 在桌面与 390px 移动宽度下验证 `#welcome`、`#blog` 有效布局且无水平溢出。
- 根据用户最终表述修订 2026-05-13 青年科学家论坛新闻：标题为“杨来浩受邀在 UNIfied 2026-SMMI 青年科学家论坛作报告”；正文精简为“2026 年 5 月 13 日，杨来浩受邀参加 2026 International Conference on Advanced Sensing, Condition Monitoring, and Intelligent Maintenance Innovations（UNIfied 2026-SMMI）青年科学家论坛，并作特邀报告‘面向航空发动机原位检测与维修的机器人系统（Robotic Systems for In-Situ Inspection and Repair of Aero-Engines）’。”英文主页同步更新，旧的不完整报告题目“机器人具身智能如何赋能高端装备把脉问诊”以及会议地点 / 主持人等额外说明已从该新闻正文移除。
- 根据本地 PDF `Yang Laihao SR AE Acceptance 2026.docx.pdf` 新增团队新闻：杨来浩受邀担任 `IEEE Sensors Reviews` Associate Editor。PDF 为 IEEE Sensors Reviews 主编 Eui-Hyeok Yang 的邀请函，说明初始任期一年；页面按文件保存日期使用 2026-06-23 展示，并同步英文翻译。
- 重新设置站内视频为不可下载状态：研究方向、亮点报道、亮点成果共 9 个本地视频均保留播放控件，同时添加 `controlslist="nodownload"` 并禁用默认右键菜单，减少浏览器控件中的下载入口；测试新增全站视频属性校验。
- 删除页面中的说明性来源 / 整理口径文案：团队成员简介不再显示“根据学校教师主页公开成员信息整理”，硕士 / 已毕业面板不再显示“来源：孙瑜老师主页...”按钮；专利二级标题下不再显示 `Google Patents` / `CNKI` 小标签及“按保存页面整理、共多少条、同一专利若已授权...”说明。英文翻译表同步移除这些说明性兜底文案。
- 修复全站列表时间顺序：团队动态所有卡片按事件日期由新到旧排列；团队成员中博士、硕士按入学年级由新到旧排列，已毕业学生按毕业 / 年级时间由新到旧排列；成果条目按年份由新到旧排列，覆盖亮点成果、项目、论文、专利、专著、获奖和社会任职等筛选视图。
- 修正“非攻机器人实验室”立意表达：页面不再出现具体词条出处、来源链接或“名称来源”卡片；简介改为“取‘非攻’一器多形之巧，造因境而变、入微而作的具身智能机器人”，并进一步映射到可重构、柔顺、可感知、可操作的具身智能机器人系统，以及智能诊断、原位介入、具身操作三条研究主线。
- 首页关键词更新为：软体/连续体机器人、爬行机器人、具身智能、灵巧操作、触觉传感，并同步英文关键词。
- 实验室简介删除依托单位表述，其余立意和研究方向说明保留并同步英文主页。
- 删除团队成员区独立的孙瑜老师学生分组；按用户要求将郭庆凯、汪领、梁浩峰、王韵博归入“博士研究生”，其余 8 名当前学生归入“硕士研究生”。新增学生条目仅保留研究方向，不再显示“金点子选手”等特点备注；无毕业院校信息的条目不补院校。
- 已毕业学生去重：王景、刘乙雪与原有毕业生条目重复，保留此前版本的论文 / 去向信息，删除后续来源中新增的重复简略条目；其余孙瑜老师公开页面毕业生并入既有“已毕业”分组。英文页面已同步。
- 首页中文主标题“非攻机器人实验室”增加一行显示约束；本地桌面和 390px 移动视口均验证标题单行且不溢出。
- 团队名称更新为“非攻机器人实验室 / Feigong Robotics Laboratory”。当前页面按实验室立意解释“非攻”，明确不按墨子或墨家“非攻”思想解释。
- 修复团队成果区英文简介乱码：补齐成果栏目总简介和“项目”概览卡片的精确英文翻译，避免英文切换时中文被剥离后只剩 `2、10、3400` 等数字和标点；项目简介已完善为项目类型、数量和经费规模说明。
- 修复团队成果英文界面：移除成果条目通用英文占位兜底（如 `Publication (2026)`、`Research project (2025)`、`Patent (2024)`），新增成果页专用片段翻译逻辑，并补齐 28 条缺失的论文 / 专利英文标题翻译。英文模式下成果区所有一级和二级分类均不再出现占位文本或中文残留。
- 修复英文页面不完整问题：补充页面元信息、图片 `alt`、无障碍 `aria-label`、研究方向、成果条目、项目、专利、专著、获奖和社会任职等关键内容的英文翻译。
- 添加站点访问统计：页脚新增 Busuanzi 浏览量 / 访客数统计，并支持中英文切换。
- 学生竞赛获奖新增：`首届“太行杯”航空动力创新大赛优胜奖`，获奖时间按 2026 展示。
- 移除页面中 `/.netlify/images` 图片代理依赖，改为直接引用 `assets/team-profile.jpg` 和 `assets/leader-yang.png`，避免 GitHub Pages / 本地静态服务下图片 404。
- 新增 `.nojekyll` 并部署，用于禁用 GitHub Pages 的 Jekyll 处理流程，修复 Pages build failed。
- 本地新增专利成果整理：成果区“专利”下保留“国际专利 / 中国专利”二级标题与筛选；按保存的 Google Patents 页面补齐国际专利 8 条；按四个保存的中国知网页面去重整理中国专利 96 条，其中 52 条发明授权、44 条发明公开。同一专利若已授权，仅保留授权号与授权信息。
- 团队动态更新：联网读取杨来浩教师主页、孙瑜教师主页以及中国振动工程学会等可核验来源，动态区新增“新闻 / 通知”筛选；当前展示 10 条新闻、4 条通知，并补齐对应英文翻译。
- 修复 2025 年以前中国专利英文翻译：补齐 53 条 2024 年及更早中国专利标题英文译名，并新增结构化专利元信息翻译逻辑，英文模式下专利号、申请日、公开日、授权日和权利人不再回退为占位文本。
- 国际专利状态修正：国际专利 8 条中仅 2026 年两条保持公开状态，其余 6 条统一标注为授权。
- 团队动态新增“亮点报道”栏目并置于新闻筛选第一位：补入陕西新闻联播、陕西卫视《丝路新周刊》和西安交通大学新闻网 / 央视正午国防军事三条媒体报道；本地视频素材位于 `新闻报道/`，页面引用 `*-web.mp4` 压缩网页版本以适配 GitHub Pages。
- 央视正午国防军事报道标题口径已由“西安交大陈雪峰教授团队”改为“西安交通大学团队”。新闻栏目新增 3 条“杨来浩受邀”动态：重庆交通大学航空学院前沿微课讲座、深圳大学机电与控制工程学院学术讲座、青年科学家论坛报告，并同步补齐英文翻译。
- 成果区新增“亮点成果”栏目并置于项目之前，默认优先展示 TRO 2024 接触辅助连续体机器人、Science Advances 2026 扭矩触觉灵巧操作、Advanced Science 2024 双稳态昆虫尺度跳跃机器人三篇代表性论文，包含简短介绍、论文信息、DOI 链接和本地压缩视频；“其他论文”删除 2022 年两条错误记录。

线上最新状态：

- 线上站点：https://yanglaihao.github.io/
- GitHub Pages Actions 部署：`success`；本轮 `pages-build-deployment` run `28066057142` 已成功，线上站点已抓取验证。注意 GitHub `/pages` legacy 状态可能停留在中间内容提交的 `errored`，但后续 `pages-build-deployment` Actions run 已成功部署当前远端内容。
- 当前远端 `main`：以 GitHub 仓库 `refs/heads/main` 为准；本轮欢迎页与团队札记页内容部署提交为 `794f98d379b7a53fee18e87deb59c29eaf6cdb24`，后续若仅补充本交接文件，仍以远端 ref 的最新提交为准。
- 页面内容更新提交：`794f98d379b7a53fee18e87deb59c29eaf6cdb24`
- 线上 HTML / `script.js` / `styles.css` 已验证包含 `#welcome`、`#blog`、`近期亮点工作`、`开放讨论区`、GitHub Issues 公开讨论入口，以及 `Welcome` / `Lab Notes` 英文导航与对应样式。
- `.nojekyll` 修复提交：`46a12113d35046f8d13a29af602745b515de09e6`

最新部署方式：普通 `git push` 多次因 GitHub HTTPS 网络 / HTTP2 错误失败，最终使用 GitHub CLI + GitHub Git Data API 创建 blob / tree / commit 并更新 `main` 引用。随后手动触发 Pages build，添加 `.nojekyll` 后构建成功。

## 当前背景

这是一个静态 GitHub Pages 团队主页项目，目录位于：

`/Users/howie/Documents/个人主页`

主页主题已经从通用个人主页模板改为“非攻机器人实验室”主页，围绕西安交通大学机械工程学院团队信息组织内容。页面当前包含：首页、实验室简介、研究方向、团队动态、团队成员、团队成果、联系方式。注意：首页简介应呈现实验室立意，不出现具体词条出处或来源链接；“非攻”按“一器多形、因境而变、入微而作”的机构学 / 机器人寓意解释，不按墨子或墨家“非攻”思想解释。

本地仓库已有远端：

```bash
origin  https://github.com/yanglaihao/yanglaihao.github.io.git
```

注意：本地 `main` 的 git 历史仍未完全对齐远端 `main`，因为多轮部署通过 GitHub API 直接更新了远端。后续若要改用普通 Git 流程，建议先从远端重新 clone 或谨慎对齐历史，避免误推。

## 已完成进度

### 研究方向

三个研究方向均为可点击切换的可播放视频模块，使用 `<video controls controlslist="nodownload" oncontextmenu="return false" autoplay muted loop playsinline>`：

- 智能诊断：`assets/research-diagnosis.mp4`
- 原位介入：`assets/research-intervention.mp4`
- 具身操作：`assets/research-embodied.mp4`

### 团队成员

团队成员区已改为类似研究方向的点击切换展开模式。默认只展开“团队领导”，其他分组点击后再展开：

- 团队领导
- 教师 / 合作导师
- 博士后
- 博士研究生
- 硕士研究生
- 本科生
- 已毕业

教师 / 合作导师分组已加入孙瑜副教授条目，并提供个人主页链接。孙瑜老师公开页面中的当前学生已并入既有学生分组：郭庆凯、汪领、梁浩峰、王韵博在“博士研究生”，任亨、谢时雨、赵子攀、贾秀梅、侯传鑫、李昊阳、杨建傲、唐骏元在“硕士研究生”；条目仅保留研究方向，不显示特点备注或缺失院校。已毕业分组并入孙瑜老师公开页面毕业生，王景、刘乙雪等与原有条目重复者保留此前版本并删除新增重复简略条目。博士后部分仍为描述性占位，未列出更多姓名。

### 团队成果

团队成果区已重构为：

1. 成果简介
2. 关键数字概览卡片
3. 一级成果板块：亮点成果、项目、论文、专利、专著、获奖、社会任职
4. 论文二级分类：全部论文、SCI 期刊、EI 期刊、EI 会议、预印本、其他论文
5. 专利二级分类：国际专利、中国专利
6. 获奖二级分类：科学技术奖、科技论文获奖、学生竞赛获奖、社会奖励、学位论文获奖

论文列表当前整理为 92 篇：

- SCI 期刊：65 篇
- EI 期刊：4 篇
- EI 会议：19 篇
- 预印本：2 篇
- 其他论文：2 篇

亮点成果栏目已置于项目之前并作为默认成果视图，包含 3 篇论文及本地视频：`assets/paper-highlights/contact-aided-continuum.mp4`、`assets/paper-highlights/torque-dexterity.mp4`、`assets/paper-highlights/bistable-jumper.mp4`。项目列表按个人主页“科研项目”页整理 18 条。专利区已设置“国际专利 / 中国专利”两个标题；国际专利按保存的 `inventor_(Laihao Yang) - Google Patents.html` 整理 8 条，其中仅 2026 年两条为公开状态，其余 6 条均标注授权；中国专利按保存的 `高级检索-中国知网.html`、`高级检索-中国知网1.html`、`高级检索-中国知网2.html`、`高级检索-中国知网3.html` 整理，去除重复与已授权专利的公开版后保留 96 条，其中 52 条发明授权、44 条发明公开。获奖列表已更新为 18 条，其中学生竞赛获奖新增 2026 年首届“太行杯”航空动力创新大赛优胜奖。社会任职按个人主页 Academic / 社会任职页整理 11 条。

### 团队动态与英文切换

团队动态已按“亮点报道 / 新闻 / 通知”拆分。亮点报道包含陕西新闻联播、陕西卫视《丝路新周刊》和西安交通大学新闻网 / 央视正午国防军事三条媒体报道，并嵌入本地视频素材。新闻主要来自杨来浩教师主页“我的新闻”第一页、学校新闻外链、中国振动工程学会外链、三条媒体报道、重庆交通大学航空学院前沿微课讲座报道、深圳大学机电与控制工程学院学术讲座、用户提供的青年科学家论坛海报，以及本地 IEEE Sensors Reviews Associate Editor 邀请函 PDF；通知主要来自孙瑜教师主页“我的新闻”与杨来浩团队欢迎新同学条目。当前展示 3 条亮点报道、16 条新闻、4 条通知。

中英文切换已扩展为全页面静态文本翻译，并补充：

- 页面 `title`、`description`、Open Graph 标题和描述。
- 图片 `alt` 与关键 `aria-label`。
- 研究方向标题、说明和要点。
- 团队动态亮点报道 / 新闻 / 通知筛选、动态标题、摘要和视频无障碍标签。
- 成果区亮点成果筛选、三篇代表性论文标题、摘要、论文视频无障碍标签和 DOI 信息。
- 项目、论文、专利、专著、获奖、社会任职等成果条目的英文翻译；英文成果页使用 `translateAchievementText` 专用片段翻译，不再使用通用成果类型占位兜底。
- 2025 年以前中国专利标题与结构化专利元信息翻译。
- 页脚访问统计标签。

本地浏览器验证显示英文模式可见中文文本数量为 0。

### 访问统计

页脚新增 Busuanzi 统计脚本：

```html
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

页面包含：

- `busuanzi_value_site_pv`：浏览量
- `busuanzi_value_site_uv`：访客数

中英文模式下分别显示为“浏览量 / 访客数”和“Page Views / Visitors”。

## 关键文件

- `index.html`：页面主体内容，包括研究方向、成员、成果、联系方式、访问统计。
- `styles.css`：页面样式，包括视频区域、成员切换、成果筛选布局和访问统计样式。
- `script.js`：交互逻辑，包括主题切换、中英文切换、移动菜单、研究方向切换、成员切换、成果板块与论文 / 获奖二级筛选。
- `tests/site-checks.js`：结构校验脚本，验证视频、成员折叠、成果分类、专利公开 / 授权状态、太行杯奖项、访问统计、GitHub Pages 静态图片路径等。
- `.nojekyll`：禁用 GitHub Pages Jekyll 构建处理，当前远端已部署。
- `README.md`：项目说明和资料来源说明。
- `assets/research-diagnosis.mp4`：智能诊断方向视频。
- `assets/research-intervention.mp4`：原位介入方向视频。
- `assets/research-embodied.mp4`：具身操作方向视频。
- `assets/leader-yang.png`：杨来浩老师照片。
- `assets/team-profile.jpg`：首页团队/研究展示图。
- `assets/site-qr.svg`：团队主页二维码。
- `assets/paper-highlights/`：三篇亮点成果论文的网页压缩视频。
- `素材/`：用户原始素材目录，不建议直接部署到线上。
- `论文素材/`：用户提供的论文原始视频素材目录；页面使用的是压缩后的 `assets/paper-highlights/`。

## 验证记录

本地已运行并通过：

```bash
node --check script.js
node tests/site-checks.js
```

最近一次本地复验：2026-06-16 00:10 CST，以上两条命令均以退出码 0 结束。

本轮英文成果页修复复验：2026-06-17 17:13 CST，`node tests/site-checks.js` 以退出码 0 结束；本地浏览器英文模式逐项检查成果区一级 / 二级分类，亮点成果、项目、全部论文、SCI、EI 期刊、EI 会议、预印本、其他论文、全部专利、国际专利、中国专利、专著、全部获奖、各获奖子类、社会任职均为 0 个中文残留、0 个成果占位文本。

本轮成果简介乱码修复复验：2026-06-17 19:44 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；本地浏览器英文模式读取成果区总简介与四个概览卡片，成果总简介和项目卡片均为完整英文，项目卡片不再显示 `2、3400+` 之类残留。

本轮非攻立意、成员合并和标题单行修复复验：2026-06-20 22:32 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；本地浏览器验证中文简介不含“百度百科 / 词条 / 名称来源”，页面不存在独立 `sun-team` 成员面板，孙瑜老师公开页面中的当前学生已出现在“硕士研究生”分组，毕业生已并入“已毕业”分组；英文模式无 `Baidu Baike` / `dictionary entry` / `Yu Sun Team Students` / `Yu Sun Team Alumni` / `Team member information` 可见文本；中文首页主标题在桌面和 390px 移动视口均为单行且无溢出。

本轮成员归类、备注清理、毕业生去重和简介依托单位删除复验：2026-06-20 23:06 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；本地浏览器验证中文简介不含“依托西安交通大学机械工程学院和航空发动机研究所”，郭庆凯、汪领、梁浩峰、王韵博位于“博士研究生”且不在“硕士研究生”，其余新增学生位于“硕士研究生”，新增学生条目无特点备注；王景、刘乙雪保留此前毕业生版本，删除后续来源中的重复简略条目；英文页面同步且无成员占位文本。

本轮非攻立意和首页关键词修复复验：2026-06-20 23:29 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；本地浏览器验证中文立意句为“取‘非攻’一器多形之巧，造因境而变、入微而作的具身智能机器人”，英文为 `embodied intelligent robots that adapt to their environment and work at fine scale`；首页关键词更新为“软体/连续体机器人、爬行机器人、具身智能、灵巧操作、触觉传感”，英文对应为 `Soft / Continuum Robotics, Crawling Robots, Embodied Intelligence, Dexterous Manipulation, Tactile Sensing`。

本轮全站列表时间顺序修复复验：2026-06-21 01:09 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；新增结构校验覆盖团队动态日期倒序、亮点成果年份倒序、项目 / 获奖 / 社会任职年份倒序，以及博士生、硕士生、已毕业学生列表的时间倒序。

本轮说明性来源文案清理复验：2026-06-21 06:33 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；结构校验确认成员区不再显示“来源：孙瑜老师主页...”按钮，成员简介不再显示“根据学校教师主页公开成员信息整理”，专利分区不再显示 `Google Patents` / `CNKI` 整理说明或去重说明，英文翻译表不再保留对应说明性英文文案。

本轮视频不可下载设置复验：2026-06-22 08:26 CST，`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束；结构校验确认页面 9 个本地 `<video>` 标签均包含 `controlslist="nodownload"` 和 `oncontextmenu="return false"`，覆盖研究方向、亮点报道和亮点成果视频。线上 `https://yanglaihao.github.io/?verify=20260622-video-nodownload` 抓取验证同样确认 9 个视频标签均包含上述属性。

本轮 IEEE Sensors Reviews 新闻新增复验：2026-06-23 21:52 CST，使用 `pdfplumber` 抽取并渲染核对本地 PDF 内容，确认邀请函来自 IEEE Sensors Reviews 主编 Eui-Hyeok Yang，邀请杨来浩担任 Associate Editor，初始任期一年；`node --check script.js` 和 `node tests/site-checks.js` 均以退出码 0 结束，结构校验确认新增新闻日期为 2026-06-23、新闻总数为 16 条，并补齐英文翻译。

本地浏览器验证过：

- 英文模式下可见中文文本数量为 0，语言按钮显示 `ZH`。
- 中文模式下太行杯奖项可见，年份为 2026。
- 英文模式下太行杯奖项显示为 `Merit Award, 1st Taihang Cup Aviation Power Innovation Competition`。
- 访问统计块存在，并能显示 Busuanzi 返回的浏览量和访客数。
- 首页与负责人图片使用直接资源路径，不再请求 `/.netlify/images`。
- 中文页团队动态数量为 3 条亮点报道、16 条新闻、4 条通知。
- 英文页中三条新增“杨来浩受邀”动态、央视正午国防军事标题和外链来源均已正确翻译 / 保留。
- 英文成果页所有一级 / 二级分类均不再显示 `Publication (year)`、`Research project (year)`、`Patent (year)` 等占位文案。

线上验证过：

- GitHub Pages Actions `pages-build-deployment` 最近一次部署为 `success`；线上 HTML 已抓取验证。
- 线上 HTML 包含：
  - `【央视正午国防军事】报道西安交通大学团队攻克“卡脖子”难题`
  - `杨来浩受邀参加青年科学家论坛并作报告`
  - `机器人具身智能如何赋能高端装备把脉问诊`
  - `http://cqia.cqjtu.edu.cn/info/1183/4046.htm`
  - `https://cmce.szu.edu.cn/info/1017/8965.htm`
  - `首届“太行杯”航空动力创新大赛优胜奖`
  - `<div class="pub-year">2026</div>` 对应该奖项
  - `visitor-stats`
  - `busuanzi_value_site_pv`
  - `busuanzi.pure.mini.js`
  - `assets/team-profile.jpg`
  - `assets/leader-yang.png`
- 线上 HTML 不包含 `/.netlify/images`，也不包含旧标题口径 `西安交大陈雪峰教授团队`。
- 线上 `script.js` 包含三条新增新闻和央视标题的英文翻译。

## 当前本地状态

本地工作区仍是 dirty 状态，因为最新部署通过 GitHub API 直接提交到了远端，而不是在本地仓库创建 commit。

当前 `git status -sb` 显示：

- 已修改：`.gitignore`
- 已修改：`README.md`
- 已修改：`index.html`
- 已修改：`script.js`
- 已修改：`styles.css`
- 已修改：`tests/site-checks.js`
- 未跟踪：`.nojekyll`
- 未跟踪：`HANDOFF.md`

说明：

- `.gitignore`、`.nojekyll`、`README.md`、`HANDOFF.md`、`index.html`、`script.js`、`styles.css`、`tests/site-checks.js` 的最新内容已通过 GitHub API 部署到远端。
- 远端提交 `1a81bf75384088c4b20dd4ddadd0be3fae3b5fd0` 对应本轮 IEEE Sensors Reviews Associate Editor 新闻新增内容更新；本文件可能由随后的交接说明提交继续更新。
- 本地 `git status` 仍显示这些文件为已修改 / 未跟踪，是因为本地历史没有与远端 API 部署历史对齐，不代表线上缺少这些文件。

## 待办

1. 同步 / 清理本地 git 状态
   - 建议优先从远端 `main` 重新 clone 一份干净工作区，或谨慎把当前本地历史与远端 API 部署历史对齐。
   - 避免直接从当前本地 `main` 普通 push，因为本地历史与远端可能不一致。

2. 优化视频体积
   - 当前三个 MP4 总体积较大。
   - 如果页面加载偏慢，可压缩视频或提供更小尺寸版本。

3. 校准成果列表
   - 当前 92 篇论文是公开资料交叉整理的代表性条目。
   - 后续可进一步按 Google Scholar / ResearchGate / 学校主页逐条核对 DOI、期刊、年份、作者排序。

4. 完善成员信息
   - 教师 / 合作导师已加入孙瑜副教授条目。
   - 博士后目前缺少具体姓名，可继续从学校主页或团队公开材料中补全。

5. 视觉与移动端复查
   - 已做基础浏览器验证。
   - 后续可专门检查手机宽度、平板宽度、长论文标题换行和视频加载表现。

## 下一步计划

推荐下一轮按以下顺序推进：

1. 先处理本地仓库与远端 `main` 的历史对齐，最好用远端重新 clone 出干净工作区。
2. 做一次移动端视觉检查和线上交互复查。
3. 继续补全团队成员、国际专利明细、媒体报道和更多成果链接。
4. 压缩研究方向视频，降低页面加载压力。

## 注意事项

- 普通 `git push` 曾多次遇到 GitHub HTTPS 网络错误，包括 `Failed to connect to github.com port 443` 和 `Error in the HTTP2 framing layer`。
- 使用 GitHub CLI API 创建 blob / tree / commit / ref 更新更稳定，已成功部署最新页面。
- GitHub Pages 曾在提交 `7d0e04deab5da33dc2467782498940381fba7c92` 后显示 `Page build failed.`；添加 `.nojekyll` 后，提交 `46a12113d35046f8d13a29af602745b515de09e6` 构建成功。
- 本地预览如遇端口冲突，可换用新端口，例如：

```bash
python3 -m http.server 4180
```

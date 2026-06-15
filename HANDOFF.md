# HANDOFF

## 最新更新

更新时间：2026-06-16 00:18 CST

本文件已更新到当前项目状态。最新一轮已完成并部署：

- 修复英文页面不完整问题：补充页面元信息、图片 `alt`、无障碍 `aria-label`、研究方向、成果条目、项目、专利、专著、获奖和社会任职等关键内容的英文翻译。
- 添加站点访问统计：页脚新增 Busuanzi 浏览量 / 访客数统计，并支持中英文切换。
- 学生竞赛获奖新增：`首届“太行杯”航空动力创新大赛优胜奖`，获奖时间按 2026 展示。
- 移除页面中 `/.netlify/images` 图片代理依赖，改为直接引用 `assets/team-profile.jpg` 和 `assets/leader-yang.png`，避免 GitHub Pages / 本地静态服务下图片 404。
- 新增 `.nojekyll` 并部署，用于禁用 GitHub Pages 的 Jekyll 处理流程，修复 Pages build failed。
- 本地新增专利成果整理：成果区“专利”下保留“国际专利 / 中国专利”二级标题与筛选；按保存的 Google Patents 页面补齐国际专利 8 条；按四个保存的中国知网页面去重整理中国专利 96 条，其中 52 条发明授权、44 条发明公开。同一专利若已授权，仅保留授权号与授权信息。
- 团队动态更新：联网读取杨来浩教师主页、孙瑜教师主页以及中国振动工程学会等可核验来源，动态区新增“新闻 / 通知”筛选；当前展示 10 条新闻、4 条通知，并补齐对应英文翻译。
- 修复 2025 年以前中国专利英文翻译：补齐 53 条 2024 年及更早中国专利标题英文译名，并新增结构化专利元信息翻译逻辑，英文模式下专利号、申请日、公开日、授权日和权利人不再回退为占位文本。
- 国际专利状态修正：国际专利 8 条中仅 2026 年两条保持公开状态，其余 6 条统一标注为授权。
- 团队动态新增“亮点工作”栏目并置于新闻筛选第一位：补入陕西新闻联播、陕西卫视《丝路新周刊》和西安交通大学新闻网 / 央视正午国防军事三条媒体报道；本地视频素材位于 `新闻报道/`，页面引用 `*-web.mp4` 压缩网页版本以适配 GitHub Pages。
- 央视正午国防军事报道标题口径已由“西安交大陈雪峰教授团队”改为“西安交通大学团队”。新闻栏目新增 3 条“杨来浩受邀”动态：重庆交通大学航空学院前沿微课讲座、深圳大学机电与控制工程学院学术讲座、青年科学家论坛报告，并同步补齐英文翻译。

线上最新状态：

- 线上站点：https://yanglaihao.github.io/
- GitHub Pages 状态：`built`
- 当前远端 `main`：本轮页面内容已更新到 `ea6a3f203d16a611c15b7c2928f3cbe4f39dced4`；如果随后有 HANDOFF-only 小提交，以 GitHub API 返回的最新提交为准。
- 页面内容更新提交：`ea6a3f203d16a611c15b7c2928f3cbe4f39dced4`
- `.nojekyll` 修复提交：`46a12113d35046f8d13a29af602745b515de09e6`

最新部署方式：普通 `git push` 多次因 GitHub HTTPS 网络 / HTTP2 错误失败，最终使用 GitHub CLI + GitHub Git Data API 创建 blob / tree / commit 并更新 `main` 引用。随后手动触发 Pages build，添加 `.nojekyll` 后构建成功。

## 当前背景

这是一个静态 GitHub Pages 团队主页项目，目录位于：

`/Users/howie/Documents/个人主页`

主页主题已经从通用个人主页模板改为“高端装备智能检修机器人团队”主页，围绕西安交通大学机械工程学院团队信息组织内容。页面当前包含：首页、团队简介、研究方向、团队动态、团队成员、团队成果、联系方式。

本地仓库已有远端：

```bash
origin  https://github.com/yanglaihao/yanglaihao.github.io.git
```

注意：本地 `main` 的 git 历史仍未完全对齐远端 `main`，因为多轮部署通过 GitHub API 直接更新了远端。后续若要改用普通 Git 流程，建议先从远端重新 clone 或谨慎对齐历史，避免误推。

## 已完成进度

### 研究方向

三个研究方向均为可点击切换的可播放视频模块，使用 `<video controls autoplay muted loop playsinline>`：

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

教师 / 合作导师分组已加入孙瑜副教授条目，并提供个人主页链接。博士后部分仍为描述性占位，未列出更多姓名。

### 团队成果

团队成果区已重构为：

1. 成果简介
2. 关键数字概览卡片
3. 一级成果板块：项目、论文、专利、专著、获奖、社会任职
4. 论文二级分类：全部论文、SCI 期刊、EI 期刊、EI 会议、预印本、其他论文
5. 专利二级分类：国际专利、中国专利
6. 获奖二级分类：科学技术奖、科技论文获奖、学生竞赛获奖、社会奖励、学位论文获奖

论文列表当前整理为 94 篇：

- SCI 期刊：65 篇
- EI 期刊：4 篇
- EI 会议：19 篇
- 预印本：2 篇
- 其他论文：4 篇

项目列表按个人主页“科研项目”页整理 18 条，并在成果栏默认优先显示。专利区已设置“国际专利 / 中国专利”两个标题；国际专利按保存的 `inventor_(Laihao Yang) - Google Patents.html` 整理 8 条，其中仅 2026 年两条为公开状态，其余 6 条均标注授权；中国专利按保存的 `高级检索-中国知网.html`、`高级检索-中国知网1.html`、`高级检索-中国知网2.html`、`高级检索-中国知网3.html` 整理，去除重复与已授权专利的公开版后保留 96 条，其中 52 条发明授权、44 条发明公开。获奖列表已更新为 18 条，其中学生竞赛获奖新增 2026 年首届“太行杯”航空动力创新大赛优胜奖。社会任职按个人主页 Academic / 社会任职页整理 11 条。

### 团队动态与英文切换

团队动态已按“亮点工作 / 新闻 / 通知”拆分。亮点工作包含陕西新闻联播、陕西卫视《丝路新周刊》和西安交通大学新闻网 / 央视正午国防军事三条媒体报道，并嵌入本地视频素材。新闻主要来自杨来浩教师主页“我的新闻”第一页、学校新闻外链、中国振动工程学会外链、三条媒体报道、重庆交通大学航空学院前沿微课讲座报道、深圳大学机电与控制工程学院学术讲座，以及用户提供的青年科学家论坛海报；通知主要来自孙瑜教师主页“我的新闻”与杨来浩团队欢迎新同学条目。当前展示 3 条亮点工作、15 条新闻、4 条通知。

中英文切换已扩展为全页面静态文本翻译，并补充：

- 页面 `title`、`description`、Open Graph 标题和描述。
- 图片 `alt` 与关键 `aria-label`。
- 研究方向标题、说明和要点。
- 团队动态亮点工作 / 新闻 / 通知筛选、动态标题、摘要和视频无障碍标签。
- 项目、专利、专著、获奖、社会任职等成果条目的代表性英文翻译。
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
- `素材/`：用户原始素材目录，不建议直接部署到线上。

## 验证记录

本地已运行并通过：

```bash
node --check script.js
node tests/site-checks.js
```

最近一次本地复验：2026-06-16 00:10 CST，以上两条命令均以退出码 0 结束。

本地浏览器验证过：

- 英文模式下可见中文文本数量为 0，语言按钮显示 `ZH`。
- 中文模式下太行杯奖项可见，年份为 2026。
- 英文模式下太行杯奖项显示为 `Merit Award, 1st Taihang Cup Aviation Power Innovation Competition`。
- 访问统计块存在，并能显示 Busuanzi 返回的浏览量和访客数。
- 首页与负责人图片使用直接资源路径，不再请求 `/.netlify/images`。
- 中文页团队动态数量为 3 条亮点工作、15 条新闻、4 条通知。
- 英文页中三条新增“杨来浩受邀”动态、央视正午国防军事标题和外链来源均已正确翻译 / 保留。

线上验证过：

- GitHub Pages 状态为 `built`。
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
- 远端提交 `ea6a3f203d16a611c15b7c2928f3cbe4f39dced4` 对应本轮页面内容更新；本文件如有随后交接说明小提交，以 GitHub API 返回提交为准。
- 本地 `git status` 仍显示这些文件为已修改 / 未跟踪，是因为本地历史没有与远端 API 部署历史对齐，不代表线上缺少这些文件。

## 待办

1. 同步 / 清理本地 git 状态
   - 建议优先从远端 `main` 重新 clone 一份干净工作区，或谨慎把当前本地历史与远端 API 部署历史对齐。
   - 避免直接从当前本地 `main` 普通 push，因为本地历史与远端可能不一致。

2. 优化视频体积
   - 当前三个 MP4 总体积较大。
   - 如果页面加载偏慢，可压缩视频或提供更小尺寸版本。

3. 校准成果列表
   - 当前 94 篇论文是公开资料交叉整理的代表性条目。
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

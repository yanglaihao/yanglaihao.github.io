# HANDOFF

## 最新更新

更新时间：2026-06-06 21:56 CST

本文件已创建并更新到当前项目状态。需要特别注意：本轮本地继续修改了英文切换、团队动态、成果默认顺序、二维码和首页简介，但尚未部署；线上最近一次已部署提交是 `b27d8ccb96fb2f657ae54f40ca49110290ceeb91`。

当前本地工作区仍是 dirty 状态：

- 已修改：`.gitignore`、`README.md`、`index.html`、`script.js`、`styles.css`
- 未跟踪：`HANDOFF.md`、`tests/`、研究方向视频与图片资源、`assets/leader-yang.png`、`assets/team-profile.jpg`、`assets/site-qr.svg`
- 远端 `yanglaihao/yanglaihao.github.io` 已包含上一次通过 GitHub API 部署的页面功能文件和视频资源；本地 git 历史未同步这些部署提交。

本轮已补充 `.gitignore`，忽略 `.DS_Store`、`素材/` 和 `references.bib`，避免把本地噪声或原始素材目录误提交。如果下一步希望让 `HANDOFF.md` 也进入远端仓库，需要单独提交/部署它。

## 当前背景

这是一个静态 GitHub Pages 团队主页项目，目录位于：

`/Users/howie/Documents/个人主页`

线上站点：

https://yanglaihao.github.io/

主页主题已经从通用个人主页模板改为“高端装备智能检修机器人团队”主页，围绕西安交通大学机械工程学院团队信息组织内容。页面当前包含：首页、团队简介、研究方向、团队动态、团队成员、团队成果、联系方式。

最近一次已部署提交：

https://github.com/yanglaihao/yanglaihao.github.io/commit/b27d8ccb96fb2f657ae54f40ca49110290ceeb91

部署方式：由于本地目录没有配置 Git remote，之前使用 GitHub CLI + GitHub Git Data API 直接把文件提交到了 `yanglaihao/yanglaihao.github.io` 的 `main` 分支。

## 已完成进度

### 研究方向

三个研究方向均已改为可点击切换的可播放视频模块，使用 `<video controls autoplay muted loop playsinline>`：

- 智能诊断：`assets/research-diagnosis.mp4`
- 原位介入：`assets/research-intervention.mp4`
- 具身操作：`assets/research-embodied.mp4`

线上已验证三个 MP4 资源均返回：

- `HTTP/2 200`
- `content-type: video/mp4`

### 团队成员

团队成员区已改为类似研究方向的点击切换展开模式。默认只展开“团队领导”，其他分组点击后再展开：

- 团队领导
- 教师 / 合作导师
- 博士后
- 博士研究生
- 硕士研究生
- 本科生
- 已毕业

当前成员信息主要来自学校主页公开信息。教师 / 合作导师分组已加入孙瑜副教授条目，博士后部分仍为描述性占位，未列出更多姓名。

本轮已移除教师分组中的来源说明文字，并为孙瑜副教授条目加入个人主页链接按钮。

### 团队成果

团队成果区已重构为：

1. 成果简介
2. 关键数字概览卡片
3. 一级成果板块：项目、论文、专利、专著、获奖、社会任职
4. 论文二级分类：全部论文、SCI 期刊、EI 期刊、EI 会议、预印本、其他论文
5. 获奖二级分类：科学技术奖、科技论文获奖、学生竞赛获奖、社会奖励、学位论文获奖

论文列表当前整理为 94 篇：

- SCI 期刊：65 篇
- EI 期刊：4 篇
- EI 会议：19 篇
- 预印本：2 篇
- 其他论文：4 篇

资料来源参考了学校主页、ResearchGate、Google Scholar 链接、ORCID 和公开 DOI 信息。Google Scholar 自动访问在当前环境中不稳定，ResearchGate 也存在 Cloudflare 限制，因此最终以 ResearchGate / ORCID / 学校主页 / 公开 DOI 信息交叉整理为主。

项目列表已按个人主页“科研项目”页整理 18 条，并在成果栏默认优先显示；获奖列表已按个人主页 Awards 页分类整理 17 条；社会任职已按个人主页 Academic / 社会任职页整理 11 条。获奖和社会任职条目下方的“个人主页公开信息”类来源说明已移除。

### 团队动态与英文切换

团队动态已并入个人主页“我的新闻”第一页中的学校新闻条目，当前展示 9 条去重后的近期新闻。首页简介已重新润色，强调“状态感知-原位进入-精准操作”的高端装备智能检修链路。

中英文切换已扩展为全页面静态文本翻译：核心文案使用精确英文翻译，未逐条人工翻译的少量中文成果文本在英文模式下使用英文类型说明兜底。浏览器验证显示英文模式可见中文文本数量为 0，图片和视频内容未处理。

## 关键文件

- `index.html`：页面主体内容，包括研究方向、成员、成果、联系方式。
- `styles.css`：所有页面样式，包括视频区域、成员切换、成果简介和成果筛选布局。
- `script.js`：交互逻辑，包括主题切换、中英文切换、移动菜单、研究方向切换、成员切换、成果板块与论文 / 获奖二级筛选。
- `README.md`：项目说明和资料来源说明。
- `tests/site-checks.js`：结构校验脚本，验证三段视频、成员折叠、成果简介、论文分类数量等。
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

最近一次复验：2026-06-06 21:56 CST，以上两条命令均以退出码 0 结束。

本地浏览器验证过：

- 三个研究方向视频 `readyState=4`，可播放。
- 团队成员默认只展开“团队领导”。
- 点击“硕士研究生”后只显示硕士面板。
- 成果默认显示项目板块，项目可见条目 18 条。
- 点击“获奖”后只显示获奖条目，并隐藏论文二级分类、显示获奖二级分类。
- 切回论文后点击“SCI 期刊”，只显示 65 篇 SCI 论文。
- 英文模式下可见中文文本数量为 0，语言按钮显示 `ZH`。
- 联系区二维码 `assets/site-qr.svg` 正常加载。

线上验证过：

- GitHub Pages 状态为 `built`。
- 线上 HTML 包含：
  - `research-diagnosis.mp4`
  - `research-intervention.mp4`
  - `research-embodied.mp4`
  - `achievement-overview`
  - `data-paper-subfilters`
  - `data-member-target="leader"`
- 三个线上视频均返回 `HTTP/2 200` 和 `content-type: video/mp4`。

## 当前本地状态

本地工作区仍显示修改和未跟踪文件，因为部署是通过 GitHub API 直接提交到远端，而不是在本地仓库里创建 commit。

当前 `git status -sb` 显示的本地状态包括：

- 已修改：`README.md`
- 已修改：`.gitignore`
- 已修改：`index.html`
- 已修改：`script.js`
- 已修改：`styles.css`
- 未跟踪：`HANDOFF.md`
- 未跟踪：`tests/`
- 未跟踪：`assets/leader-yang.png`
- 未跟踪：`assets/team-profile.jpg`
- 未跟踪：`assets/research-diagnosis.gif`
- 未跟踪：`assets/research-diagnosis.mp4`
- 未跟踪：`assets/research-intervention.gif`
- 未跟踪：`assets/research-intervention.mp4`
- 未跟踪：`assets/research-embodied.gif`
- 未跟踪：`assets/research-embodied.png`
- 未跟踪：`assets/research-embodied.mp4`
- 未跟踪：`assets/site-qr.svg`

当前已通过 `.gitignore` 忽略、不建议部署的内容包括：

- `.DS_Store`
- `素材/`
- `references.bib`
- 旧生成图或备用图

当前建议部署但尚未通过本地 git commit 跟踪的内容包括：

- `HANDOFF.md`
- `tests/site-checks.js`
- 页面实际引用的 `assets/` 图片与视频资源

本地目录没有配置 Git remote。若后续希望用普通 Git 流程部署，建议先配置远端：

```bash
git remote add origin https://github.com/yanglaihao/yanglaihao.github.io.git
```

注意：添加 remote 前请先确认本地仓库历史和远端历史是否需要对齐，避免误推。

## 待办

1. 决定是否部署 `HANDOFF.md`
   - 当前交接文档只在本地。
   - 如果希望下一位接手者从 GitHub 仓库直接看到它，需要把 `HANDOFF.md` 加入下一次部署。

2. 清理本地工作区
   - `.gitignore` 已忽略 `.DS_Store`、`素材/` 和 `references.bib`。
   - 仍需判断未跟踪的页面资源和测试文件是否纳入下一次部署。

3. 优化视频体积
   - 当前三个 MP4 总体积约 41 MB。
   - 如果页面加载偏慢，可压缩视频或提供更小尺寸版本。

4. 校准成果列表
   - 当前 94 篇是公开资料交叉整理的代表性条目。
   - 后续可进一步按 Google Scholar / ResearchGate / 学校主页逐条核对 DOI、期刊、年份、作者排序。

5. 完善成员信息
   - 教师 / 合作导师已加入孙瑜副教授条目。
   - 博士后目前缺少具体姓名，可继续从学校主页或团队公开材料中补全。

6. 增强成果板块
   - 项目、获奖和社会任职已按个人主页公开条目补充。
   - 专利、专著条目目前数量较少。
   - 可继续补充公开发明专利、授权专利、国际专利和媒体报道。

7. 视觉与移动端复查
   - 已做基础浏览器验证。
   - 后续可专门检查手机宽度、平板宽度、长论文标题换行和视频加载表现。

## 下一步计划

推荐下一轮按以下顺序推进：

1. 将 `.gitignore`、`HANDOFF.md`、`tests/site-checks.js` 和页面实际引用的 `assets/` 资源纳入一次干净部署。
2. 决定是否把本地仓库和远端 `yanglaihao.github.io` 建立常规 Git remote 关系。
3. 压缩三个研究方向视频，降低页面加载压力。
4. 继续补全团队成员和专利 / 获奖 / 媒体报道条目。
5. 做一次完整移动端视觉检查，再部署下一版。

## 注意事项

之前本地预览时启动过 `python3 -m http.server`，端口 `4176` 和 `4177` 曾有进程占用，普通权限无法结束，提权请求超时。它们不影响线上页面，但如果本地预览端口冲突，可换用新端口，例如：

```bash
python3 -m http.server 4180
```

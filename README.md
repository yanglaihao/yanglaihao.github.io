# 非攻机器人实验室主页

一个实验室主页静态站，当前围绕西安交通大学非攻机器人实验室组织内容，栏目包括首页、实验室简介、研究方向、团队动态、团队成员、团队成果、社会服务、团队札记和联系方式。

页面已按学校团队主页的宽版结构优化：研究方向使用可点击切换的可播放视频模块，团队成员改为分组点击展开，团队成果改为“成果简介 + 亮点成果/项目/论文/专利/专著/获奖板块”，社会服务独立放在团队成果与团队札记之间，并按期刊编委、学会委员、会议主席、社会兼职分类展示；亮点成果默认优先展示，获奖按学校主页分类展示，首页导航支持中英文切换并覆盖全页面可见文字，团队动态按亮点报道 / 新闻 / 通知区分展示，联系区包含团队主页二维码。

英文成果页已使用专用成果条目翻译逻辑，覆盖项目、论文、国际专利、中国专利、专著、获奖和社会服务等可见条目，避免回退为 `Publication (year)`、`Patent (year)` 等占位文案。

## 本地预览

这个项目是纯静态站点，不需要安装依赖。可以直接打开 `index.html`，或启动一个本地静态服务器：

```bash
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 部署到 Netlify

仓库根目录已经包含 `netlify.toml`。如果连接 GitHub 仓库到 Netlify，构建设置可以保持：

- Build command: 留空
- Publish directory: `.`

## 资料来源

- 学校主页：https://gr.xjtu.edu.cn/yanglaihao/
- 个人简介与成果规模：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/zhym/994631/list/index.htm
- 团队成员公开信息：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/zhym/994626/list/index.htm
- 科研项目：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/kyxm/316901/list/index.htm
- 专利成果：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/zlcg/316899/list/index.htm
- 获奖分类：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/zhym/994622/list/index.htm
- 社会服务 / 社会兼职：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/zdylm/1036903/list/index.htm
- 团队动态：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/article/316893/list/1.htm
- 团队动态第 2 页：https://gr.xjtu.edu.cn/yanglaihao/zh_CN/article/316893/list/2.htm
- 孙瑜主页动态：https://faculty.xjtu.edu.cn/yu.sun/zh_CN/article/332021/list/index.htm
- 孙瑜招生信息：https://faculty.xjtu.edu.cn/yu.sun/zh_CN/zdylm/980524/list/index.htm
- 孙瑜主页学生信息：https://faculty.xjtu.edu.cn/yu.sun/zh_CN/zdylm/980513/list/index.htm
- 孙瑜已毕业学生：https://faculty.xjtu.edu.cn/yu.sun/zh_CN/zdylm/980512/list/index.htm
- 陕西新闻联播报道：http://www.snrtv.com/snr_sxxwlb/a/2024/10/10/22818371.html
- 陕西卫视《丝路新周刊》报道：https://www.163.com/dy/article/JGIRJRQ90530TBVC.html
- 西安交通大学新闻网 / 央视正午国防军事报道：https://news.xjtu.edu.cn/info/1014/223743.htm
- 重庆交通大学航空学院前沿微课讲座报道：http://cqia.cqjtu.edu.cn/info/1183/4046.htm
- 深圳大学机电与控制工程学院学术讲座：https://cmce.szu.edu.cn/info/1017/8965.htm
- 青年科学家论坛信息来自用户提供的论坛海报图片。
- 参考排版：https://gr.xjtu.edu.cn/embodied_robotics/zh_CN/zhym/1072424/list/index.htm
- ResearchGate：https://www.researchgate.net/profile/Laihao-Yang-3
- Google Scholar：https://scholar.google.com/citations?user=G1LcEO4AAAAJ&hl=zh-CN
- Google Patents 本地保存页：`inventor_(Laihao Yang) - Google Patents.html`
- 中国知网本地保存页：`高级检索-中国知网.html`、`高级检索-中国知网1.html`、`高级检索-中国知网2.html`、`高级检索-中国知网3.html`
- 本地素材目录中的研究方向视频已整理到 `assets/`；媒体报道视频放在 `新闻报道/`，页面引用 `*-web.mp4` 压缩网页版本以适配 GitHub Pages；论文亮点成果视频已从 `论文素材/` 压缩整理到 `assets/paper-highlights/`。
- 论文列表参考 Google Scholar 与 ResearchGate 主页链接，并结合学校论文页、ORCID、知网保存页与公开 DOI 信息交叉整理；页面内按 SCI 期刊、EI 期刊、EI 会议、预印本和其他论文分类展示 104 篇代表性论文；“其他论文”中删除 2022 年两条错误记录。
- 成果区新增“亮点成果”栏目并置于项目之前，突出展示 TRO 2024 接触辅助连续体机器人、Science Advances 2026 扭矩触觉灵巧操作、Advanced Science 2024 双稳态昆虫尺度跳跃机器人三篇代表性工作，包含简短介绍、论文信息、DOI 链接和本地视频。
- 专利列表按本地保存的 Google Patents、中国知网页面与大为检索结果更新：国际专利 8 条，其中除 2026 年两条公开记录外其余 6 条均标注为授权；中国专利去重整理为 97 条，其中 52 条发明授权、45 条发明公开，并在条目中标注公开 / 授权状态。同一专利若已有授权号，仅保留授权信息。
- 团队动态按杨来浩、孙瑜教师主页、媒体报道、受邀讲座报道、用户提供海报及公开会议 / 媒体页面更新为 3 条亮点报道、23 条新闻、4 条通知，并补齐英文翻译。

## 后续建议补充内容

- 论文 PDF、代码、数据集、专利全文或 BibTeX 链接
- 学生团队名单、新闻动态、招生状态和课程/教学信息
- `assets/hero-manuscript.png`、`assets/research-notes.png`、`assets/project-workflow.png` 是当前主页的生成视觉图
- `assets/research-map.svg` 保留为 favicon 或备用视觉图

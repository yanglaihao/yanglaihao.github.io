# 高端装备智能检修机器人团队主页

一个团队主页静态站，当前围绕西安交通大学高端装备智能检修机器人团队组织内容，栏目包括首页、团队简介、研究方向、团队动态、团队成员、团队成果和联系方式。

页面已按学校团队主页的宽版结构优化：研究方向使用可点击切换的可播放视频模块，团队成员改为分组点击展开，团队成果改为“成果简介 + 论文/专利/专著/获奖板块”，个人简介成果规模已更新为论文 100余篇、专利 100余项、主持项目 10余项等口径。

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
- 参考排版：https://gr.xjtu.edu.cn/embodied_robotics/zh_CN/zhym/1072424/list/index.htm
- ResearchGate：https://www.researchgate.net/profile/Laihao-Yang-3
- Google Scholar：https://scholar.google.com/citations?user=G1LcEO4AAAAJ&hl=zh-CN
- 本地素材目录中的研究方向视频已整理到 `assets/`
- 论文列表参考 Google Scholar 与 ResearchGate 主页链接，并结合学校论文页、ORCID 与公开 DOI 信息交叉整理；页面内按 SCI 期刊、EI 期刊、EI 会议、预印本和其他论文分类展示 94 篇代表性论文。

## 后续建议补充内容

- 论文 PDF、代码、数据集、专利全文或 BibTeX 链接
- 学生团队名单、新闻动态、招生状态和课程/教学信息
- `assets/hero-manuscript.png`、`assets/research-notes.png`、`assets/project-workflow.png` 是当前主页的生成视觉图
- `assets/research-map.svg` 保留为 favicon 或备用视觉图

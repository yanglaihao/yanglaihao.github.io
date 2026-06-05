# 高端装备智能检修机器人团队主页

一个团队主页静态站，当前围绕西安交通大学高端装备智能检修机器人团队组织内容，栏目包括首页、团队简介、研究方向、团队动态、团队成员、团队成果和联系方式。

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
- ResearchGate：https://www.researchgate.net/profile/Laihao-Yang-3
- Google Scholar：https://scholar.google.com/citations?user=G1LcEO4AAAAJ&hl=zh-CN
- 本地素材目录中的研究方向动图已整理到 `assets/`

## 后续建议补充内容

- 具身操作方向如需动态效果，请补充对应 GIF 文件替换当前 PNG 素材
- 论文 PDF、代码、数据集、专利全文或 BibTeX 链接
- 学生团队名单、新闻动态、招生状态和课程/教学信息
- `assets/hero-manuscript.png`、`assets/research-notes.png`、`assets/project-workflow.png` 是当前主页的生成视觉图
- `assets/research-map.svg` 保留为 favicon 或备用视觉图

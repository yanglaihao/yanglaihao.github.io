# Howie Personal Homepage

一个偏学术研究方向的个人主页，当前围绕 Howie 的连续体机器人、触觉传感与机器人感知方向组织内容。

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

## 后续建议补充内容

- Google Scholar、GitHub、ORCID 等真实链接
- 代表性论文、专利、项目主页、PDF/Code/Dataset 链接和 BibTeX
- 个人照片或更贴合连续体机器人/触觉传感的抽象视觉图
- `assets/hero-manuscript.png`、`assets/research-notes.png`、`assets/project-workflow.png` 是当前主页的生成视觉图
- `assets/research-map.svg` 保留为 favicon 或备用视觉图

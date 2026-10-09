# 李鑫的个人主页

这是我的个人主页源码，也保存用于本地生成简历的内容和排版脚本。网站只展示项目、工作经历和教育背景，不发布生成后的简历文件或照片、手机号等隐私信息。页面只使用 HTML 和 CSS，不依赖构建框架，合并到 `main` 后由 GitHub Actions 发布到 GitHub Pages。

## 本地预览

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000`。提交前运行：

```bash
node scripts/validate.mjs
```

## 本地导出简历

1. 更新 `index.html` 与 `scripts/build_resume.py` 中的事实内容。
2. 在本地通过 `RESUME_PHONE` 和 `RESUME_PHOTO` 提供投递版隐私信息。
3. 运行 `scripts/build-resume.sh`，文件会生成到被 Git 忽略的 `dist/`。
4. 更新网站时同步修改 `VERSION`、`CHANGELOG.md` 和页脚版本号，运行校验后提交 PR。

示例：

```bash
RESUME_PHONE='你的手机号' RESUME_PHOTO='/照片的绝对路径' ./scripts/build-resume.sh
```

生成物不得提交到 GitHub。仓库也不复制团队私有仓库中的代码、截图或内部文档，私有项目只保留可核实的个人贡献摘要。

## 许可

网页代码采用 [MIT License](LICENSE)。简历文字、个人信息与后续可能加入的个人照片不在 MIT 授权范围内，版权归李鑫所有。

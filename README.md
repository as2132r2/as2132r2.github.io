# 李鑫的个人主页与公开简历

这是我的个人主页源码，也是公开简历的版本仓库。页面只使用 HTML 和 CSS，不依赖构建框架，合并到 `main` 后由 GitHub Actions 发布到 GitHub Pages。

## 本地预览

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000`。提交前运行：

```bash
node scripts/validate.mjs
```

## 更新简历

1. 更新 `index.html` 与 `scripts/build_resume.py` 中的事实内容。
2. 运行 `scripts/build-resume.sh` 生成公开版 DOCX 和 PDF。
3. 更新 `VERSION`、`CHANGELOG.md` 以及页脚版本号。
4. 运行校验，提交 PR；合并后创建同版本 Git tag 和 GitHub Release。

公开版不包含手机号，也不复制团队私有仓库中的代码、截图或内部文档。私有项目只保留可核实的个人贡献摘要。

## 许可

网页代码采用 [MIT License](LICENSE)。简历文字、个人信息与后续可能加入的个人照片不在 MIT 授权范围内，版权归李鑫所有。

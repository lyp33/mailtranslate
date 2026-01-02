# 快速云端部署指南

## 使用 Vercel（推荐，免费）

### 步骤 1：安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤 2：部署项目
在项目目录运行：
```bash
vercel
```

按照提示操作：
1. 登录或注册 Vercel 账号
2. 选择项目设置（直接回车使用默认设置）
3. 等待部署完成

### 步骤 3：获取部署 URL
部署成功后，会得到一个 URL，例如：
```
https://outlook-translate.vercel.app
```

### 步骤 4：更新 manifest.xml
将所有 `https://localhost:3000` 替换为您的 Vercel URL：

需要替换的位置（共约 8 处）：
- `<SourceLocation DefaultValue="...">`
- `<bt:Url id="..." DefaultValue="...">`

### 步骤 5：在 Outlook 中使用
1. 重新上传更新后的 manifest.xml
2. Outlook 网页版和桌面版都可以使用
3. 所有用户都能访问

## 使用 GitHub Pages（完全免费）

### 步骤 1：创建 GitHub 仓库
```bash
git init
git add .
git commit -m "Initial commit"
# 在 GitHub 创建仓库后
git remote add origin https://github.com/你的用户名/outlook-translate.git
git push -u origin main
```

### 步骤 2：启用 GitHub Pages
1. 进入仓库 Settings → Pages
2. Source 选择 Deploy from a branch
3. Branch 选择 main / root
4. 点击 Save

### 步骤 3：获取 URL
```
https://你的用户名.github.io/outlook-translate
```

### 步骤 4：更新 manifest.xml
替换所有 localhost URL 为您的 GitHub Pages URL

### 步骤 5：部署完成！
- 完全免费
- 自动 HTTPS
- 全球 CDN
- 适合静态项目

## 常见问题

**Q: Vercel 和 GitHub Pages 哪个更好？**
A: Vercel 部署更快，GitHub Pages 完全免费。看您的需求。

**Q: 需要修改代码吗？**
A: 不需要，只需要更新 manifest.xml 中的 URL。

**Q: 部署后所有人都能用吗？**
A: 是的，只要能访问互联网就能用。

**Q: API Token 怎么办？**
A: 每个用户在插件中配置自己的 Token，不暴露在代码中。

## 推荐方案

| 场景 | 推荐方案 | 时间 |
|------|---------|------|
| 个人使用（桌面版） | 本地 localhost | 立即可用 |
| 个人使用（网页版） | Vercel | 5分钟 |
| 团队使用 | Vercel | 5分钟 |
| 完全免费 | GitHub Pages | 10分钟 |

# 使用 ngrok 快速解决 localhost 问题

## 步骤 1：下载 ngrok

1. 访问：https://ngrok.com/download
2. 下载 Windows 版本
3. 解压到任意目录（如 C:\ngrok）

## 步骤 2：启动本地服务器

```bash
双击 start-server.bat
```

确保 http://localhost:3000 可以访问

## 步骤 3：启动 ngrok

在命令行中进入 ngrok 目录，运行：

```bash
ngrok http 3000
```

会显示类似这样的信息：

```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

**复制这个 https://abc123.ngrok.io 地址**

## 步骤 4：创建临时 manifest.xml

创建 `manifest-ngrok.xml`，将所有 `http://localhost:3000` 替换为 `https://abc123.ngrok.io`

例如：
```xml
<SourceLocation DefaultValue="https://abc123.ngrok.io/taskpane.html" />
```

## 步骤 5：在 Outlook 中加载

上传 `manifest-ngrok.xml` 到 Outlook

## 注意事项

- ngrok 的地址每次重启都会变
- 免费版有使用限制
- 适合临时测试，不适合长期使用

---

## 或者：直接部署到 GitHub Pages（完全免费，5分钟）

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库（如 outlook-translator）
3. 上传所有文件（除了 node_modules）

### 步骤 2：启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择：Deploy from a branch
3. Branch 选择：main / root
4. 点击 Save

### 步骤 3：等待部署

大约 1-2 分钟后，会得到 URL：
```
https://你的用户名.github.io/outlook-translator
```

### 步骤 4：创建生产版 manifest.xml

将所有 `http://localhost:3000` 替换为您的 GitHub Pages URL

### 步骤 5：在 Outlook 中加载

上传更新后的 manifest.xml

---

## 推荐方案

| 需求 | 方案 | 时间 |
|------|------|------|
| 快速测试 | ngrok | 2分钟 |
| 个人长期使用 | GitHub Pages | 5分钟 |
| 团队使用 | Vercel | 5分钟 |

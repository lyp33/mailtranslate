# Outlook 邮件翻译插件 - 部署指南

本指南说明如何将插件部署到云端，让其他用户可以轻松安装使用。

## 方案概述

### 方案一：云端部署（推荐）

将插件部署到公网服务器，所有用户通过同一 URL 访问。

**优点：**
- 一次部署，所有用户使用
- 便于维护和更新
- 用户体验好

**缺点：**
- 需要服务器成本
- 需要 HTTPS 证书

### 方案二：本地部署（简单）

每个用户在自己的电脑上运行本地服务器。

**优点：**
- 无需服务器成本
- 数据更安全（本地）

**缺点：**
- 每个用户都需要安装 Node.js
- 需要手动启动服务器

---

## 方案一：云端部署（推荐）

### 步骤 1：准备云服务器

可以使用以下任意云服务：

1. **Vercel** (推荐，免费)
2. **Netlify** (推荐，免费)
3. **GitHub Pages** (免费，仅静态文件)
4. **Azure Web Apps** (付费，微软官方)
5. **阿里云 / 腾讯云** (付费)

### 步骤 2：部署到 Vercel（推荐）

#### 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 部署项目

在项目根目录下运行：

```bash
vercel
```

按照提示操作：
1. 登录或注册 Vercel 账号
2. 选择项目设置
3. 部署完成后，会得到一个 URL，如：`https://outlook-translate.vercel.app`

#### 更新 manifest.xml

将 manifest.xml 中所有的 `https://localhost:3000` 替换为您的 Vercel URL：

```xml
<!-- 之前 -->
<IconUrl DefaultValue="https://localhost:3000/assets/icon-32.png" />

<!-- 之后 -->
<IconUrl DefaultValue="https://outlook-translate.vercel.app/assets/icon-32.png" />
```

需要替换的位置：
1. 所有 `https://localhost:3000` 为您的域名
2. 共约 8 处需要替换

### 步骤 3：用户安装指南

将更新后的 `manifest.xml` 分发给用户，提供以下安装说明：

#### 用户安装步骤

1. **下载 manifest.xml**
   - 从您提供的链接下载 `manifest.xml` 文件

2. **在 Outlook 中加载插件**

   **Outlook 网页版：**
   - 访问 https://outlook.office.com
   - 点击右上角设置图标（齿轮）
   - 选择 "管理加载项" 或 "Get Add-ins"
   - 点击 "自定义加载项"
   - 选择 "从文件添加"
   - 上传下载的 `manifest.xml` 文件

   **Outlook 桌面版：**
   - 打开 Outlook
   - 文件 → 管理加载项
   - 自定义加载项 → 从文件添加
   - 上传 `manifest.xml` 文件

3. **配置插件**

   首次使用时：
   - 打开任意邮件
   - 点击 "翻译邮件" 按钮
   - 点击右上角 "⚙️ 设置" 按钮
   - 输入您的 API Token
   - 点击 "保存设置"

---

## 方案二：本地部署（简单）

### 用户需要完成的步骤

#### 1. 安装 Node.js

下载并安装 Node.js：https://nodejs.org/

#### 2. 下载项目文件

将项目文件夹分享给用户（zip 压缩包或 Git 仓库）

#### 3. 安装依赖

打开命令提示符或 PowerShell，进入项目目录：

```bash
cd translate2
npm install
```

#### 4. 启动服务器

```bash
npm run serve
```

服务器将在 `http://localhost:3000` 启动

#### 5. 加载插件

按照上述 "用户安装步骤" 中的说明加载 `manifest.xml`

#### 6. 配置 API Token

点击插件右上角的 "⚙️ 设置" 按钮，输入 API Token 并保存

---

## 方案三：GitHub Pages 部署（免费静态托管）

### 步骤

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # 创建 GitHub 仓库后
   git remote add origin https://github.com/your-username/outlook-translate.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**

   - 进入仓库的 Settings → Pages
   - Source 选择 Deploy from a branch
   - Branch 选择 main / root
   - 点击 Save

3. **获取 URL**

   部署成功后，您的 URL 为：`https://your-username.github.io/outlook-translate`

4. **更新 manifest.xml**

   将所有 `https://localhost:3000` 替换为您的 GitHub Pages URL

**注意：** GitHub Pages 不支持服务器端代码，但本插件是纯前端，完全可以使用。

---

## 分发给用户的完整安装包

可以创建一个安装包，包含：

1. **项目文件**
   - 所有 HTML、CSS、JS 文件
   - manifest.xml（已更新为云端 URL）
   - package.json
   - README.md

2. **快速开始文档**

   创建 `INSTALL.md`：

   ```markdown
   # 快速安装指南

   ## 方式一：使用云端版本（推荐）

   1. 下载 manifest.xml
   2. 在 Outlook 中加载此文件
   3. 打开邮件，点击"翻译邮件"
   4. 点击"设置"按钮，输入您的 API Token
   5. 开始使用！

   ## 方式二：本地运行

   1. 安装 Node.js: https://nodejs.org/
   2. 解压项目文件
   3. 在项目目录打开命令行
   4. 运行: npm install
   5. 运行: npm run serve
   6. 在 Outlook 中加载 manifest.xml
   7. 点击"设置"按钮，输入您的 API Token
   ```

---

## 管理多个用户的 API Token

### 当前方案

每个用户自己管理自己的 API Token（存储在各自的浏览器本地存储中）

**优点：**
- 安全，Token 不集中管理
- 每个用户使用自己的 Token

**缺点：**
- 需要告知用户如何获取 API Token

### 改进方案（可选）

如果您需要为所有用户提供统一的 API Token：

1. 创建一个简单的后端 API 代理
2. 前端调用您的后端，后端再调用翻译 API
3. Token 只保存在您的服务器上

这样可以：
- 保护 API Token 不泄露
- 监控 API 使用情况
- 限流和配额管理

---

## 安全建议

1. **不要将 API Token 提交到公开仓库**
   - config.js 中的 Token 应该被删除
   - 使用 .gitignore 确保不会意外提交

2. **鼓励用户使用自己的 Token**
   - 每个用户应该有自己的 API Token
   - 避免共享同一个 Token

3. **定期更新 Token**
   - 建议用户定期更换 API Token
   - 确保账户安全

---

## 故障排除

### 问题 1：插件无法加载

**解决：**
- 确认服务器正在运行（本地部署）
- 检查 manifest.xml 中的 URL 是否正确
- 确认使用 HTTPS（云端部署必须）

### 问题 2：翻译失败

**解决：**
- 点击"设置"按钮，检查 API Token 是否正确
- 打开浏览器控制台（F12）查看错误信息
- 确认 API 地址可以访问

### 问题 3：CORS 错误

**解决：**
- 确保服务器启动时添加了 `--cors` 参数
- 如果是云端部署，需要配置 CORS 策略

---

## 更新和维护

### 如何更新插件

1. **修改代码**
2. **重新部署**（云端）或 **重启服务器**（本地）
3. **用户无需任何操作**，下次使用时自动加载新版本

### 如何更新 manifest.xml

如果修改了 manifest.xml：
- 用户需要重新加载插件
- 或者在 Outlook 中删除旧插件，重新加载新的 manifest.xml

---

## 成本估算

### Vercel 免费方案
- ✅ 免费
- ✅ 100GB 带宽/月
- ✅ 无限部署
- ✅ 自动 HTTPS

### GitHub Pages
- ✅ 完全免费
- ✅ 无限流量
- ✅ 自动 HTTPS
- ❌ 仅支持静态文件（本插件适用）

### 付费云服务器
- Azure Web Apps: 约 ¥100-200/月
- 阿里云 / 腾讯云: 约 ¥50-150/月

---

## 推荐方案总结

| 场景 | 推荐方案 | 成本 |
|------|---------|------|
| 个人使用 | 本地部署 | 免费 |
| 小团队（< 10人） | GitHub Pages | 免费 |
| 中大型团队 | Vercel / Netlify | 免费 |
| 企业级 | Azure Web Apps | 付费 |

---

## 技术支持

如遇到问题，请检查：
1. 服务器是否正常运行
2. manifest.xml URL 是否正确
3. API Token 是否有效
4. 浏览器控制台是否有错误信息

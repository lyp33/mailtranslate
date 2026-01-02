# Outlook 邮件翻译插件

一个用于 Outlook 的 Office Add-in 插件，可以将邮件内容翻译为中文。

## 功能特性

- 一键翻译邮件内容为中文
- 在任务窗格中显示原文和译文
- 支持富文本格式显示
- 加载状态和错误提示
- **用户自定义配置**：每个用户可以设置自己的 API Token
- **本地存储**：配置保存在浏览器本地，安全可靠

## 项目结构

```
translate2/
├── manifest.xml          # Office Add-in 清单文件
├── taskpane.html         # 任务窗格界面
├── taskpane.css          # 样式文件
├── taskpane.js           # 核心逻辑（API 调用、邮件内容获取）
├── settings.html         # 设置页面（用户配置 API Token）
├── settings.js           # 设置页面逻辑
├── functions.html        # 命令函数文件
├── server.js             # 独立服务器（可打包成 EXE）
├── package.json          # 项目配置
│
├── 启动服务器.bat         # ⭐ 双击启动（推荐）
├── 停止服务器.bat         # 停止服务器
├── 一键安装.bat           # 首次安装
├── 检查状态.bat           # 状态检查
├── 打包成EXE.bat          # 打包工具
│
├── README.md             # 项目说明
├── 用户使用说明.md        # 用户文档
├── 分发指南.md           # 分发说明
└── DEPLOYMENT.md         # 云端部署指南
```

## 安装和运行

### ⭐ 推荐方式：双击启动

**Windows 用户：**

1. **EXE 版本（最简单）**
   ```
   双击 "Outlook翻译插件.exe"
   ```
   - 无需安装 Node.js
   - 双击即用
   - 适合所有用户

2. **BAT 版本**
   ```
   双击 "启动服务器.bat"
   ```
   - 自动安装依赖
   - 自动启动服务器

**首次使用：**
- 运行 `一键安装.bat` 自动安装依赖

---

### 开发者方式：命令行

#### 前置要求

- Node.js (v14 或更高版本)
- Outlook 2016 或更高版本（桌面版或网页版）
- npm

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器

**方法一：使用 npm script**

```bash
npm run serve
```

这将在 `http://localhost:3000` 启动一个静态文件服务器。

**方法二：使用独立服务器**

```bash
node server.js
```

**方法三：使用全局 http-server**

如果已全局安装 http-server：

```bash
npm install -g http-server
http-server . -p 3000 --cors -c-1
```

---

### 打包成 EXE（可选）

如果要分发给别人使用，可以打包成独立的 EXE 文件：

```bash
# 运行打包脚本
双击 "打包成EXE.bat"

# 或手动打包
npm install -g pkg
pkg server.js --targets node18-win-x64 --output Outlook翻译插件.exe
```

详见 **[分发指南.md](分发指南.md)**

### 在 Outlook 中加载插件

#### 方式一：Outlook 网页版

1. 访问 [Outlook 网页版](https://outlook.office.com)
2. 点击右上角的设置图标（齿轮）
3. 选择 "管理加载项" 或 "Get Add-ins"
4. 选择 "我的加载项"
5. 点击 "自定义加载项" → "添加自定义加载项"
6. 选择 "从文件添加"
7. 上传 `manifest.xml` 文件
8. 确认添加

#### 方式二：Outlook 桌面版

1. 打开 Outlook 桌面版
2. 进入 "文件" → "管理加载项"
3. 在加载项管理页面，选择 "自定义加载项"
4. 点击 "添加自定义加载项" → "从文件添加"
5. 上传 `manifest.xml` 文件
6. 重启 Outlook

### 使用插件

1. 在 Outlook 中打开一封邮件
2. 在邮件阅读窗格的工具栏中，点击 "翻译邮件" 按钮
3. 右侧将弹出翻译任务窗格
4. 首次使用时，点击右上角 "⚙️ 设置" 按钮配置 API Token
5. 点击 "翻译为中文" 按钮
6. 等待翻译完成，查看翻译结果

## 配置

### 设置 API Token

插件提供图形化设置界面，无需手动编辑代码：

1. 打开插件，点击右上角 "⚙️ 设置" 按钮
2. 填写以下信息：
   - **API 地址**：翻译 API 的完整 URL
   - **认证 Token**：您的 Bearer Token（会自动添加 "Bearer " 前缀）
   - **LLM 模型**：选择使用的 AI 模型（如 qwen-max）
   - **Temperature**：设置翻译的随机性（0-1）
3. 点击 "保存设置"

配置会保存在浏览器本地存储中，安全可靠。

## 部署到云端

如果要让其他用户也能使用此插件，请查看 **[DEPLOYMENT.md](DEPLOYMENT.md)** 部署指南，包含：

- 🚀 云端部署方案（Vercel、GitHub Pages 等）
- 👥 多用户安装指南
- 🔐 安全最佳实践
- 💰 成本估算

## 开发说明

### 文件说明

- **manifest.xml**: 定义插件的基本信息、权限、UI 等配置
- **taskpane.html**: 任务窗格的 HTML 结构
- **taskpane.css**: 任务窗格的样式
- **taskpane.js**: 主要逻辑，包括：
  - 使用 Office.js API 获取邮件内容
  - 调用翻译 API
  - 显示翻译结果
- **config.js**: API 配置文件

### API 请求格式

```javascript
POST https://portal.insuremo.com/api/mo-re/ai-qa-service/aiqa/api/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "query": "你好",
  "messages": [
    {
      "role": "user",
      "content": "你好,请将如下内容翻译为中文：\n\n{邮件内容}"
    }
  ],
  "temperature": 0.2,
  "llm_code": "qwen-max",
  "stream": false
}
```

### API 响应格式

```javascript
{
  "data": "翻译后内容",
  "is_tool_calls": false
}
```

## 图标

目前插件使用占位图标。如需自定义图标，请创建以下文件并放置在 `assets/` 目录下：

- `icon-16.png` (16x16 像素)
- `icon-32.png` (32x32 像素)
- `icon-64.png` (64x64 像素)
- `icon-80.png` (80x80 像素)

## 故障排除

### 插件无法加载

1. 确保开发服务器正在运行（`http://localhost:3000`）
2. 检查 manifest.xml 中的 URL 是否正确
3. 确认 Outlook 版本支持 Office Add-ins

### 翻译失败

1. 检查浏览器控制台（F12）查看错误信息
2. 验证 API 配置是否正确
3. 确认认证 Token 是否有效
4. 检查网络连接

### CORS 错误

如果遇到跨域问题，确保：
- 开发服务器启动时使用了 `--cors` 参数
- API 服务器允许来自 `localhost:3000` 的跨域请求

## 安全注意事项

⚠️ **重要提醒**：

- 不要将 `config.js` 中的 `AUTH_TOKEN` 提交到公开的代码仓库
- 生产环境建议使用环境变量或后端代理来管理敏感信息
- 定期更新认证 Token 以确保安全性

## 许可证

MIT License

## 技术栈

- Office JavaScript API (Office.js)
- HTML/CSS/JavaScript
- Fabric UI (Microsoft Office UI 框架)

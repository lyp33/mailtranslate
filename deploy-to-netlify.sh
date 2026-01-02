# 快速部署到 Netlify Drop（拖拽即部署，完全免费）

## 步骤 1：准备文件

将以下文件复制到一个新文件夹（如 `outlook-translator`）：

必需文件：
- manifest.xml（需要先更新 URL）
- taskpane.html
- taskpane.css
- taskpane.js
- settings.html
- settings.js
- functions.html
- server.js（可选，云端不需要）

## 步骤 2：更新 manifest.xml

创建 `manifest-cloud.xml`：

将所有：
```
http://localhost:3000
```

替换为（假设 Netlify 会给您的 URL）：
```
https://outlook-translator.netlify.app
```

## 步骤 3：部署到 Netlify

1. 访问：https://app.netlify.com/drop
2. 将准备好的文件夹拖拽到页面中
3. 等待部署完成（几秒钟）
4. 会得到一个 URL，如：
   ```
   https://random-name-12345.netlify.app
   ```

## 步骤 4：在 Outlook 中使用

1. 下载部署好的 manifest.xml（如果需要更新 URL）
2. 在 Outlook 中加载

---

## 最简单的方法：直接拖拽部署

### 方法：使用 Tiiny Host（免费，无需注册）

1. 访问：https://tiiny.host/
2. 选择 "Host for free"
3. 上传您的 index.html（或 taskpane.html）
4. 获取分享链接

但这个方法有文件限制...

---

## 真正最简单的方法：使用 CodeSandbox

1. 访问：https://codesandbox.io/
2. 创建静态项目
3. 上传文件
4. 获取预览 URL

---

# 总结：最推荐的三个方案

## 1. GitHub Pages（推荐指数：⭐⭐⭐⭐⭐）
- 完全免费
- 永久有效
- HTTPS 自动支持
- 需要 GitHub 账号

## 2. Netlify Drop（推荐指数：⭐⭐⭐⭐⭐）
- 完全免费
- 拖拽即部署
- 无需注册
- 最简单快速

## 3. ngrok（推荐指数：⭐⭐⭐）
- 适合临时测试
- 需要下载软件
- 每次重启地址会变
- 有流量限制

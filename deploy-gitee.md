# 使用 Gitee Pages 部署（国内推荐）

## 为什么选择 Gitee？

- ✅ 国内访问速度快
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 部署简单
- ✅ 无需备案

## 步骤 1：注册 Gitee

1. 访问：https://gitee.com/
2. 注册账号（免费）

## 步骤 2：创建仓库

1. 点击右上角 "+" → "新建仓库"
2. 仓库名称：outlook-translator
3. 设置为**公开**
4. 点击 "创建"

## 步骤 3：上传文件

### 方法 A：网页上传（最简单）

1. 进入仓库
2. 点击 "文件" → "上传文件"
3. 上传这些文件：
   - taskpane.html
   - taskpane.css
   - taskpane.js
   - settings.html
   - settings.js
   - functions.html
   - manifest.xml（先不上传）

4. 点击 "提交"

### 方法 B：Git 命令（推荐）

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://gitee.com/你的用户名/outlook-translator.git
git push -u origin main
```

## 步骤 4：启用 Gitee Pages

1. 进入仓库
2. 点击 "服务" → "Gitee Pages"
3. 点击 "启动"
4. 选择分支：main
5. 目录：根目录
6. 点击 "启动"

## 步骤 5：获取 URL

等待几秒后，会显示您的网站地址：
```
https://你的用户名.gitee.io/outlook-translator
```

## 步骤 6：创建生产版 manifest.xml

将所有：
```
http://localhost:3000
```

替换为：
```
https://你的用户名.gitee.io/outlook-translator
```

保存为 `manifest-production.xml`

## 步骤 7：在 Outlook 中加载

1. 下载 `manifest-production.xml`
2. 在 Outlook 中加载此文件

## 完成！

现在：
- ✅ 国内用户访问快速
- ✅ Outlook 可以正常加载
- ✅ 完全免费
- ✅ 自动 HTTPS

---

## 注意事项

1. Gitee Pages 需要实名认证
2. 首次启动可能需要几分钟
3. 如果更新文件，需要在 Gitee Pages 页面点击"更新"
4. 免费版有流量限制（个人使用足够）

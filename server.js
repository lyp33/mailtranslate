/**
 * Outlook 翻译插件 - 独立服务器
 * 可以被打包成 EXE 文件
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME 类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

// 创建服务器
const server = http.createServer((req, res) => {
    // 启用 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 获取文件路径
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './taskpane.html';
    }

    // 获取文件扩展名
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // 读取并返回文件
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - 文件未找到</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('服务器错误: ' + error.code);
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType + '; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            res.end(content, 'utf-8');
        }
    });
});

// 启动服务器
server.listen(PORT, () => {
    console.log('');
    console.log('========================================');
    console.log('  Outlook 邮件翻译插件服务器');
    console.log('========================================');
    console.log('');
    console.log(`  服务器地址: http://localhost:${PORT}`);
    console.log(`  按 Ctrl+C 停止服务器`);
    console.log('');
    console.log('========================================');
    console.log('');
});

// 优雅退出
process.on('SIGINT', () => {
    console.log('');
    console.log('[!] 服务器已停止');
    process.exit(0);
});

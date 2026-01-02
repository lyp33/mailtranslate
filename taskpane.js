/* global Office */

let originalEmailContent = '';

// 默认配置
const DEFAULT_CONFIG = {
    API_URL: 'https://portal.insuremo.com/api/mo-re/ai-qa-service/aiqa/api/chat',
    AUTH_TOKEN: 'Bearer eBaoCCAIFrZR-JVfKwShOE6Qj_Nxu3DA',
    LLM_CODE: 'qwen-max',
    TEMPERATURE: 0.2,
    STREAM: false
};

// Office.js 初始化
Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById('translate-button').onclick = translateEmail;
        document.getElementById('settings-button').onclick = openSettings;
        document.getElementById('clear-button').onclick = clearContent;
        loadEmailContent();
        checkConfig();
    } else {
        // 如果不在 Outlook 中（直接浏览器访问），只绑定事件
        document.getElementById('translate-button').onclick = translateEmail;
        document.getElementById('settings-button').onclick = openSettings;
        document.getElementById('clear-button').onclick = clearContent;
        checkConfig();
    }
});

// 加载邮件内容
async function loadEmailContent() {
    try {
        const item = Office.context.mailbox.item;

        // 获取邮件正文
        item.body.getAsync('text', (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                originalEmailContent = result.value;
                document.getElementById('original-text').value = originalEmailContent || '';
            } else {
                showError('无法获取邮件内容');
            }
        });

        // 获取邮件主题作为补充信息
        item.subject.getAsync((result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                const subject = result.value;
                if (subject && originalEmailContent) {
                    originalEmailContent = `主题：${subject}\n\n${originalEmailContent}`;
                    document.getElementById('original-text').value = originalEmailContent;
                }
            }
        });

    } catch (error) {
        console.error('加载邮件内容失败:', error);
        showError('加载邮件内容失败: ' + error.message);
    }
}

// 清空内容
function clearContent() {
    document.getElementById('original-text').value = '';
    document.getElementById('translated-content').style.display = 'none';
}

// 翻译邮件
async function translateEmail() {
    // 从 textarea 获取内容
    const content = document.getElementById('original-text').value.trim();

    if (!content) {
        showError('请输入需要翻译的内容');
        return;
    }

    const translateButton = document.getElementById('translate-button');
    const loadingDiv = document.getElementById('loading');
    const translatedContent = document.getElementById('translated-content');
    const translatedText = document.getElementById('translated-text');

    try {
        // 显示加载状态
        translateButton.disabled = true;
        loadingDiv.style.display = 'block';
        translatedContent.style.display = 'none';

        // 调用翻译 API
        const translatedTextResult = await callTranslationAPI(content);

        // 显示翻译结果
        translatedText.textContent = translatedTextResult;
        translatedContent.style.display = 'block';

    } catch (error) {
        console.error('翻译失败:', error);
        showError('翻译失败: ' + error.message);
    } finally {
        translateButton.disabled = false;
        loadingDiv.style.display = 'none';
    }
}

// 调用翻译 API
async function callTranslationAPI(content) {
    const config = getConfig();

    try {
        const requestBody = {
            query: `将如下内容翻译为中文：\n\n${content}`,
            messages: [],
            temperature: config.TEMPERATURE,
            llm_code: config.LLM_CODE,
            stream: config.STREAM
        };

        const response = await fetch(config.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.AUTH_TOKEN
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API 请求失败，状态码: ${response.status}`);
        }

        const result = await response.json();

        if (result.data) {
            return result.data;
        } else {
            throw new Error('API 返回数据格式错误');
        }

    } catch (error) {
        console.error('API 调用错误:', error);
        throw error;
    }
}

// 显示错误信息
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // 3秒后自动隐藏
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// 显示成功信息
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.content').appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// 获取配置（从本地存储或返回默认配置）
function getConfig() {
    try {
        const configStr = localStorage.getItem('translator_config');
        if (configStr) {
            return { ...DEFAULT_CONFIG, ...JSON.parse(configStr) };
        }
    } catch (error) {
        console.error('读取配置失败:', error);
    }
    return { ...DEFAULT_CONFIG };
}

// 检查配置
function checkConfig() {
    // 配置检查已禁用
    // 用户可以直接使用默认配置或通过设置页面修改
}

// 打开设置页面
function openSettings() {
    // 在新窗口中打开设置页面
    const settingsUrl = window.location.origin + '/settings.html';
    window.open(settingsUrl, '_blank', 'width=600,height=700');
}


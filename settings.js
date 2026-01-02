/* global Office */

// 默认配置
const DEFAULT_CONFIG = {
    API_URL: 'https://portal.insuremo.com/api/mo-re/ai-qa-service/aiqa/api/chat',
    AUTH_TOKEN: '',
    LLM_CODE: 'qwen-max',
    TEMPERATURE: 0.2,
    STREAM: false
};

// Office.js 初始化
Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        loadSettings();
        setupEventHandlers();
    }
});

// 设置事件处理器
function setupEventHandlers() {
    document.getElementById('settings-form').onsubmit = saveSettings;
    document.getElementById('reset-button').onclick = resetToDefaults;
}

// 从本地存储加载设置
function loadSettings() {
    const config = getConfig();

    document.getElementById('api-url').value = config.API_URL || DEFAULT_CONFIG.API_URL;
    document.getElementById('auth-token').value = config.AUTH_TOKEN || '';
    document.getElementById('llm-code').value = config.LLM_CODE || DEFAULT_CONFIG.LLM_CODE;
    document.getElementById('temperature').value = config.TEMPERATURE || DEFAULT_CONFIG.TEMPERATURE;
}

// 保存设置
function saveSettings(event) {
    event.preventDefault();

    const config = {
        API_URL: document.getElementById('api-url').value.trim(),
        AUTH_TOKEN: document.getElementById('auth-token').value.trim(),
        LLM_CODE: document.getElementById('llm-code').value,
        TEMPERATURE: parseFloat(document.getElementById('temperature').value),
        STREAM: DEFAULT_CONFIG.STREAM
    };

    // 验证输入
    if (!config.API_URL) {
        showMessage('请输入 API 地址', 'error');
        return;
    }

    if (!config.AUTH_TOKEN) {
        showMessage('请输入认证 Token', 'error');
        return;
    }

    // 如果 Token 没有 "Bearer " 前缀，自动添加
    if (!config.AUTH_TOKEN.startsWith('Bearer ')) {
        config.AUTH_TOKEN = 'Bearer ' + config.AUTH_TOKEN;
    }

    // 保存到本地存储
    saveConfig(config);

    showMessage('设置保存成功！', 'success');
}

// 重置为默认值
function resetToDefaults() {
    if (confirm('确定要重置为默认设置吗？')) {
        localStorage.removeItem('translator_config');
        loadSettings();
        showMessage('已重置为默认设置', 'success');
    }
}

// 获取配置
function getConfig() {
    try {
        const configStr = localStorage.getItem('translator_config');
        if (configStr) {
            return JSON.parse(configStr);
        }
    } catch (error) {
        console.error('读取配置失败:', error);
    }
    return { ...DEFAULT_CONFIG };
}

// 保存配置
function saveConfig(config) {
    try {
        localStorage.setItem('translator_config', JSON.stringify(config));
    } catch (error) {
        console.error('保存配置失败:', error);
        showMessage('保存失败: ' + error.message, 'error');
    }
}

// 显示消息
function showMessage(text, type = 'success') {
    const messageDiv = document.getElementById('message');

    // 移除所有类
    messageDiv.className = '';

    // 添加适当的类
    if (type === 'error') {
        messageDiv.className = 'error-message';
    } else {
        messageDiv.className = 'success-message';
    }

    messageDiv.textContent = text;
    messageDiv.style.display = 'block';

    // 3秒后自动隐藏
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// 游戏配置
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const TILE_COUNT = CANVAS_SIZE / GRID_SIZE;
const GAME_SPEED = 100;

// 游戏状态
let snake = [];
let food = { x: 0, y: 0 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isGameRunning = false;
let isPaused = false;

// Canvas 设置
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// DOM 元素
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

// 初始化最高分显示
highScoreElement.textContent = highScore;

// 初始化游戏
function initGame() {
    // 初始化蛇的位置（从中间开始，长度为3）
    snake = [
        { x: Math.floor(TILE_COUNT / 2), y: Math.floor(TILE_COUNT / 2) },
        { x: Math.floor(TILE_COUNT / 2) - 1, y: Math.floor(TILE_COUNT / 2) },
        { x: Math.floor(TILE_COUNT / 2) - 2, y: Math.floor(TILE_COUNT / 2) }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    gameOverElement.classList.add('hidden');
    generateFood();
}

// 生成食物
function generateFood() {
    let newFood;
    let isValidPosition = false;

    // 确保食物不会生成在蛇身上
    while (!isValidPosition) {
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };

        isValidPosition = !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }

    food = newFood;
}

// 更新游戏状态
function update() {
    if (!isGameRunning || isPaused) return;

    // 更新方向
    direction = { ...nextDirection };

    // 计算新的头部位置
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // 检查碰撞 - 墙壁
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    // 检查碰撞 - 自身
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // 添加新的头部
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;

        // 更新最高分
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }

        generateFood();
    } else {
        // 移除尾部
        snake.pop();
    }

    draw();
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 绘制网格（可选）
    ctx.strokeStyle = '#16213e';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
        ctx.stroke();
    }

    // 绘制食物
    ctx.fillStyle = '#e74c3c';
    ctx.shadowColor = '#e74c3c';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // 绘制蛇
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = '#00d4ff';
            ctx.shadowColor = '#00d4ff';
            ctx.shadowBlur = 10;
        } else {
            // 蛇身
            const gradient = ctx.createLinearGradient(
                segment.x * GRID_SIZE,
                segment.y * GRID_SIZE,
                segment.x * GRID_SIZE + GRID_SIZE,
                segment.y * GRID_SIZE + GRID_SIZE
            );
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(1, '#7b2cbf');
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 0;
        }

        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    });
    ctx.shadowBlur = 0;
}

// 游戏结束
function gameOver() {
    isGameRunning = false;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
    startBtn.textContent = '开始游戏';
}

// 开始游戏
function startGame() {
    if (isGameRunning) return;

    initGame();
    isGameRunning = true;
    isPaused = false;
    startBtn.textContent = '游戏中...';
    pauseBtn.textContent = '暂停';

    gameLoop = setInterval(update, GAME_SPEED);
    draw();
}

// 暂停/继续游戏
function togglePause() {
    if (!isGameRunning) return;

    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';

    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('暂停', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    } else {
        draw();
    }
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (!isGameRunning || isPaused) return;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y !== 1) {
                nextDirection = { x: 0, y: -1 };
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y !== -1) {
                nextDirection = { x: 0, y: 1 };
            }
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x !== 1) {
                nextDirection = { x: -1, y: 0 };
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x !== -1) {
                nextDirection = { x: 1, y: 0 };
            }
            e.preventDefault();
            break;
        case ' ':
            togglePause();
            e.preventDefault();
            break;
    }
});

// 按钮事件
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', startGame);

// 初始绘制
initGame();
draw();

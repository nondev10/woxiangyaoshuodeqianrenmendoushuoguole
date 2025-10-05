// 图片路径数组
const imagePaths = [
    './image/meme/1.jpg',
    './image/meme/2.jpg',
    './image/meme/3.jpg',
    './image/meme/4.jpg',
    './image/meme/5.jpg',
    './image/meme/6.jpg',
    './image/meme/7.jpg',
    './image/meme/8.jpg',
    './image/meme/9.jpg',
    './image/meme/10.jpg',
];

let flyingImagesActive = false;

function createFlyingImage() {
    if (!flyingImagesActive) return;
    
    const container = document.getElementById('flying-container');
    const img = document.createElement('img');
    img.className = 'flying-image';
    
    // 随机选择图片
    const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    img.src = randomImage;
    
    // 大小
    img.style.scale = 0.5;
    
    // 随机选择动画类型
    const animationType = Math.floor(Math.random() * 3 + 0.98);
    
    if (animationType === 0) {
        // 居中放大消失
        img.classList.add('zoom-face');
        img.style.left = '50%';
        img.style.top = '50%';
        img.style.zIndex = '114514';
        
        setTimeout(() => {
            img.remove();
        }, 800);
    } 
    else if (animationType === 1) {
        // 横穿动画
        img.classList.add('fly-horizontal');
        
        // 随机方向 (左到右或右到左)
        const direction = Math.floor(Math.random() * 2);
        const startRotate = Math.floor(Math.random() * 360);
        const endRotate = Math.floor(Math.random() * 360 * 2);
        
        img.style.setProperty('--start-rotate', `${startRotate}deg`);
        img.style.setProperty('--end-rotate', `${endRotate}deg`);
        
        if (direction === 0) {
            // 从左到右
            img.style.left = '0';
            img.style.top = `${Math.floor(Math.random() * 80)}%`;
            img.style.setProperty('--start-x', '-100vw');
            img.style.setProperty('--end-x', '333vw');
        } else {
            // 从右到左
            img.style.right = '0';
            img.style.top = `${Math.floor(Math.random() * 80)}%`;
            img.style.setProperty('--start-x', '100vw');
            img.style.setProperty('--end-x', '-333vw');
        }
        
        // 随机动画时间
        const duration = 1 + Math.random();
        img.style.animationDuration = `${duration}s`;
        
        container.appendChild(img);
        
        setTimeout(() => {
            img.remove();
        }, duration * 1000);
    }
    else {
        // 螺旋上下动画
        img.classList.add('fly-vertical-spiral');
        
        // 随机方向 (上到下或下到上)
        const direction = Math.floor(Math.random() * 2);

        if (direction === 0) {
            // 从上到下
            img.style.top = '-10%';
            img.style.left = `${Math.floor(Math.random() * 80)}%`;
            img.style.setProperty('--start-y', '-10vh');
            img.style.setProperty('--end-y', '110vh');
        } else {
            // 从下到上
            img.style.bottom = '-10%';
            img.style.left = `${Math.floor(Math.random() * 80)}%`;
            img.style.setProperty('--start-y', '10vh');
            img.style.setProperty('--end-y', '-110vh');
        }
    };
    
    // 创建动画元素
    // 随机动画时间
    const duration = 1 + Math.random();
    img.style.animationDuration = `${duration}s`;
    
    container.appendChild(img);
    
    setTimeout(() => {
        img.remove();
    }, duration * 500);
}

function startFlyingImages() {
    flyingImagesActive = true;
    // 每0.05秒创建一个新图片
    setInterval(createFlyingImage, 50);
}

// 创建全局音频对象
let audioPlayer = null;
let isPlaying = false;

// 初始化函数
function initPlayer() {
    // 创建音频对象
    audioPlayer = new Audio();
    audioPlayer.loop = true;
    audioPlayer.src = "./true-music.mp3";
}

// 神惊画面
function frames() {
    const attract = document.getElementById("attract");
    const guidance = document.getElementById("guidance");
    attract.style = "background-image: url('./image/satan.png')";
    guidance.style = "color: red";
    setTimeout(() => {guidance.innerText = "撒旦·草东之神 已被唤醒"}, 50);

    // 启动图片飞舞效果
    if (!flyingImagesActive) {
        startFlyingImages();
    }
}

// 点击页面两次时的处理
function handleClick() {
    setTimeout(frames, 0);

    if (!audioPlayer) {
        initPlayer();
    }
    
    if (!isPlaying) {
        // 设置播放起始时间
        audioPlayer.currentTime = 33;
        
        // 尝试播放
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
            }).catch(error => {
                console.log("播放失败:", error);
                // 延迟再次尝试
                setTimeout(() => {
                    audioPlayer.play().then(() => {
                        isPlaying = true;
                    });
                }, 200);
            });
        }
    } else {
        // 暂停或恢复播放
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }
};

// 点击画面一次时的处理
function warning() {
    const guidance = document.getElementById("guidance");
    const attract = document.getElementById("attract");
    attract.style = "background-image: url('./image/normal.png')";
    guidance.style = "color: orange";
    guidance.innerText = "再点一下试试！？";
    document.addEventListener("click", handleClick);
};

// 页面加载完成后设置
document.addEventListener("DOMContentLoaded", function() {
    
    // 添加点击监听
    document.addEventListener("click", warning);
});

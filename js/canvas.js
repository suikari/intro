const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const imgBall = document.getElementById('img-ball'); // HTML에서 미리 삽입된 이미지 참조
const cat = document.getElementById('cat');

let x = canvas.width / 2;
let y = 0;
let speedY = 0;
let speedX = 0;
let acceleration = 50;
let angularVelocity = 0;
let rotation = 0;
const timeSpeed = 10;

let lastTimestamp = null;

function draw(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    let timeDiff = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
  
    timeDiff *= timeSpeed;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    speedY += acceleration * timeDiff;
    y += speedY * timeDiff;
    rotation += angularVelocity * timeDiff;
    x += speedX * timeDiff;
  
    // 공이 캔버스를 벗어나지 않도록 제한
    if (y > canvas.height - 100) {  
      y = canvas.height - 100;
      speedY = -speedY * 0.7;
      speedX = speedX * 0.9;
    }
  
    if (y < 0) {
      y = 0;
      speedY = -speedY * 0.7;
    }
  
    if (x < 0 || x > canvas.width - 100) {
      speedX = -speedX * 0.7;
      x = Math.max(0, Math.min(x, canvas.width - 100));
    }
  
    // 공을 100x100 크기로 그리기
    ctx.save();
    ctx.translate(x + 50, y + 50);
    ctx.rotate(rotation);
    ctx.drawImage(imgBall, -50, -50, 100, 100);
    ctx.restore();
  
    // 고양이가 캔버스를 벗어나지 않도록 제한
    const catWidth = cat.offsetWidth;
    const catHeight = cat.offsetHeight;
    const catX = Math.max(0, Math.min(x, canvas.width - catWidth));
    const catY = Math.max(0, Math.min(y, canvas.height - catHeight));
  
    cat.style.left = `${catX}px`;
    cat.style.top = `${catY}px`;
  
    window.requestAnimationFrame(draw);
  }
  

window.requestAnimationFrame(draw);

canvas.addEventListener('click', (e) => {
  speedY = -100;
  speedX = (Math.random() - 0.5) * 150;
  angularVelocity = Math.random() - 0.5;
});
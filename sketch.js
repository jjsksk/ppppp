let shapes = [];
let maxShapes = 50;
let baseSize = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < maxShapes; i++) {
    shapes.push(new RandomShape());
  }
}

function draw() {
  background('#faedcd');
  for (let s of shapes) {
    s.update();
    s.display();
  }
}

function mouseMoved() { // 互動內容切換
  if (mouseX > pmouseX) {
    baseSize += 0.1;
  } else if (mouseX < pmouseX) {
    baseSize = max(0.1, baseSize - 0.1);
  }
}

class RandomShape {// 隨機形狀類別
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 30);
    this.type = random(['circle', 'diamond', 'star']);
    this.color = color(random(150, 255), random(150, 255), random(150, 255), 180);
    this.dx = random(-1, 1);
    this.dy = random(-1, 1);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    noStroke();

    let s = this.size * baseSize;

    switch (this.type) {
      case 'circle':
        ellipse(0, 0, s, s);
        break;
      case 'diamond':
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, s, s);
        break;
      case 'star':
        drawStar(0, 0, s / 2, s, 5);
        break;
    }
    pop();
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// 互動內容切換
function showURL(url) {
  const frame = document.getElementById('content-frame');
  frame.innerHTML = `<iframe src="${url}"></iframe>`;
  frame.style.display = 'block';
}

function showImage(src) {
  const frame = document.getElementById('content-frame');
  frame.innerHTML = `<img src="${src}" alt="自我介紹圖片">`;
  frame.style.display = 'block';
}

function showVideo(src) {
  const frame = document.getElementById('content-frame');
  frame.innerHTML = `<video controls src="${src}"></video>`;
  frame.style.display = 'block';
}

function goHome() {
  const frame = document.getElementById('content-frame');
  frame.innerHTML = '';
  frame.style.display = 'none';
}

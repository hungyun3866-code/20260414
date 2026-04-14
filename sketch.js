let targetX;     
let currentX;    
let activeWeek = 1;
const totalWeeks = 3; // 設定總週數

function setup() {
  createCanvas(windowWidth, windowHeight);
  targetX = width / 2; 
  currentX = width / 2;
}

function draw() {
  currentX = lerp(currentX, targetX, 0.05);
  drawGalleryEnvironment();
  drawDecorativeWalls(currentX);
  syncAllGroups();
}

function drawGalleryEnvironment() {
  background(25, 28, 32); 
  noStroke();
  fill(15, 12, 8);
  rect(0, height * 0.75, width, height * 0.25);
  stroke(20);
  line(0, height * 0.75, width, height * 0.75);
}

function drawDecorativeWalls(x) {
  push();
  rectMode(CENTER);
  // 循環繪製每一週的燈光與裝飾框
  for (let i = 0; i < totalWeeks; i++) {
    let posX = x + (i * width); 
    drawSpotlight(posX, height * 0.45 - 230);
    drawSmallFrames(posX);
  }
  pop();
}

function drawSpotlight(centerX, y) {
  push();
  fill(150, 130, 50); 
  stroke(100, 80, 30);
  strokeWeight(2);
  rect(centerX, y - 20, 40, 10, 2);
  quad(centerX - 15, y - 15, centerX + 15, y - 15, centerX + 25, y + 10, centerX - 25, y + 10);
  
  noStroke();
  for (let i = 0; i < 50; i++) {
    let alpha = map(i, 0, 50, 40, 0); 
    let w = map(i, 0, 50, 50, 550); 
    fill(255, 250, 200, alpha); 
    ellipse(centerX, y + 20 + (i * 8), w, 15); 
  }
  fill(255, 255, 200);
  ellipse(centerX, y + 5, 20, 10);
  pop();
}

function drawSmallFrames(centerX) {
  stroke(80, 60, 20, 100);
  fill(15, 15, 15, 100);
  rect(centerX - 650, height * 0.45, 150, 240);
  rect(centerX + 650, height * 0.45, 150, 240);
}

function syncAllGroups() {
  // 同步所有展位組的位置
  for (let i = 1; i <= totalWeeks; i++) {
    let group = select('#group-week' + i);
    let offsetX = currentX - width / 2;
    // 每一組之間間隔一個螢幕寬度 (width)
    let finalX = offsetX + ((i - 1) * width);
    group.style('transform', `translate(calc(-50% + ${finalX}px), -50%)`);
  }
}

function mousePressed() {
  // 點擊右側：前往下一週
  if (mouseX > width * 0.5) {
    if (activeWeek < totalWeeks) {
      activeWeek++;
    }
  } 
  // 點擊左側：返回前一週
  else {
    if (activeWeek > 1) {
      activeWeek--;
    }
  }
  
  // 重新計算目標位置
  // activeWeek=1 -> targetX = width/2
  // activeWeek=2 -> targetX = width/2 - width
  // activeWeek=3 -> targetX = width/2 - 2*width
  targetX = width / 2 - (activeWeek - 1) * width;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  targetX = width / 2 - (activeWeek - 1) * width;
}
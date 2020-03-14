let context;
let balls = [];
const G = 9.81;
const RADIUS = 5;
//x = X + v0*t*cos(Q)
//y = Y + v0*t*sin(Q) - 1/2g*t^2

function drawBalls(balls) {
  balls.forEach(b => {
    context.beginPath();
    context.fillStyle = "#000000";
    // Draws a circle at (x, y) coordinates with radius 10
    context.arc(b.x, b.y, RADIUS, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  });
}

function updateBalls(balls) {
  return balls.map(b => {
    const vx = b.velocity * Math.cos(b.angle * (Math.PI / 180));
    const vy = b.velocity * Math.sin(b.angle * (Math.PI / 180));
    let t = b.t + 0.02;
    const x = b.x0 + vx * t;
    let y = b.y0 - vy * t + (G / 2) * t * t;

    let x0 = b.x0;
    let y0 = b.y0;
    let velocity = b.velocity;

    if (y >= myCanvas.height - RADIUS) {
      y = -y;
      x0 = x;
      y0 = -y;
      velocity = velocity - 5;
      t = 0;
    }
    return {
      ...b,
      t,
      x,
      y,
      x0,
      y0,
      velocity
    };
  });
}

function bounceBalls() {
  context.clearRect(0, 0, 600, 600);
  drawBalls(balls);
  balls = updateBalls(balls);
}

function init() {
  context = myCanvas.getContext("2d");
  setInterval(bounceBalls, 1000 / 180);

  myCanvas.addEventListener("mousedown", function(e) {
    const { x, y } = getMousePosition(myCanvas, e);
    addBall(x, y);
  });
}
function getMousePosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

function addBall(x, y) {
  balls.push({
    x,
    y,
    x0: x,
    y0: y,
    t: 0,
    angle: 80, //Math.random() * 70,
    velocity: 50 //80
  });
}
document.addEventListener("DOMContentLoaded", function() {
  init();
});

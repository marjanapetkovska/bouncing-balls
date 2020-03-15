import { Ball } from "./ball";
let context;
let balls = [];

function drawBalls(balls) {
  balls.forEach(b => {
    b.drawBall(context);
  });
}

function updateBalls(balls) {
  return balls.forEach(b => {
    b.updateBall(myCanvas.height);
  });
}

function bounceBalls() {
  context.clearRect(0, 0, 600, 600);
  if (balls.length > 0) {
    drawBalls(balls);
    updateBalls(balls);
  }
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
  const ball = new Ball(x, y);
  balls.push(ball);
}
document.addEventListener("DOMContentLoaded", function() {
  init();
});

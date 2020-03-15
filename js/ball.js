const GRAVITY = 9.81;
const RADIUS = 5;
const COLOR = "#000000";

export class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.t = 0;
    this.angle = this.getRandomNum(15, 80);
    this.velocity = this.getRandomNum(1, 80); //50-80
  }

  drawBall(context) {
    context.beginPath();
    context.fillStyle = COLOR;
    // Draws a circle at (x, y) coordinates with given radius
    context.arc(this.x, this.y, RADIUS, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  updateBall(height) {
    //x = X + v0*t*cos(Q)
    //y = Y + v0*t*sin(Q) - 1/2g*t^2
    const vx = this.velocity * Math.cos(this.angle * (Math.PI / 180));
    const vy = this.velocity * Math.sin(this.angle * (Math.PI / 180));
    let t = this.t + 0.02;
    this.x = this.x0 + vx * t;
    this.y = this.y0 - vy * t + (GRAVITY / 2) * t * t;
    this.t = t;

    if (this.y >= height - RADIUS) {
      this.bounce();
    }
  }

  bounce() {
    this.y = -this.y;
    this.x0 = this.x;
    this.y0 = -this.y;
    this.velocity = this.velocity - 5;
    this.t = 0;
  }

  getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }
}

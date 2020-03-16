import { getRandomNum } from "./helpers";
import { GRAVITY } from "./constants";

export class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.t = 0;
    this.radius = radius;
    this.color = color;
    this.angle = getRandomNum(20, 80);
    this.velocity = getRandomNum(70, 80);
  }

  drawBall(context) {
    context.beginPath();
    context.fillStyle = this.color;
    // Draws a circle at (x, y) coordinates with given radius
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }

  // calculates balls next postion
  updateBall(canvasHeight) {
    //x = X + v0*t*cos(Q)
    //y = Y + v0*t*sin(Q) - 1/2g*t^2
    const vx = this.velocity * Math.cos(this.angle * (Math.PI / 180));
    const vy = this.velocity * Math.sin(this.angle * (Math.PI / 180));
    let t = this.t + 0.02;
    this.x = this.x0 + vx * t;
    this.y = this.y0 - vy * t + (GRAVITY / 2) * t * t;
    this.t = t;

    if (this.y >= canvasHeight - this.radius) {
      this.bounce();
    }
  }

  // bounce ball when it reaches the bottom of the canvas
  bounce() {
    this.y = -this.y;
    this.x0 = this.x;
    this.y0 = -this.y;
    // - 5 is a way to simulate lose of energy
    this.velocity = this.velocity - 5;
    this.t = 0;
  }
}

import { Ball } from "./ball";
import { RADIUS, COLOR } from "./constants";
import { getMousePosition } from "./helpers";

export class BouncingBalls {
  constructor(canvas) {
    this.balls = [];
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", e => {
      const { x, y } = getMousePosition(this.canvas, e);
      this.addBall(x, y);
    });
  }

  addBall = (x, y) => {
    const ball = new Ball(x, y, RADIUS, COLOR);
    this.balls.push(ball);
  };

  drawBalls = () => {
    this.balls.forEach(b => {
      b.drawBall(this.context);
    });
  };

  updateBalls = () => {
    this.balls.forEach(b => {
      b.updateBall(this.canvas.height);
    });
  };

  removeBallsOutsideCanvas = () => {
    this.balls = this.balls.filter(b => b.x <= this.canvas.width - RADIUS);
  };

  loop = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBalls();
    this.updateBalls();
    this.removeBallsOutsideCanvas();
  };
}

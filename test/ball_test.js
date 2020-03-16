import { Ball } from "../js/ball";

describe("Ball", () => {
  describe("bounceBall", () => {
    it("should bounce after it reaches the bottom", () => {
      const ball = new Ball(20, 30, 5, "#F0F8FF");
      ball.velocity = 12;
      ball.t = 0.02;
      ball.bounce();
      expect(ball.x).toEqual(20);
      expect(ball.y).toEqual(-30);
      expect(ball.x0).toEqual(20);
      expect(ball.y0).toEqual(30);
      expect(ball.t).toEqual(0);
      expect(ball.velocity).toEqual(7);
    });
  });
});

import { BouncingBalls } from "../js/bouncingBalls";

describe("BouncingBalls", () => {
  describe("constructor", () => {
    it("should set balls to empty array", () => {
      const b = new BouncingBalls({
        getContext: () => {},
        addEventListener: () => {}
      });
      expect(b.balls).toEqual([]);
    });
    describe("addBall", () => {
      let mockCanvas;
      beforeEach(() => {
        mockCanvas = {
          getContext: jasmine.createSpy("getContext"),
          addEventListener: jasmine.createSpy("addEventListener")
        };
      });
      it("should add one ball", () => {
        const b = new BouncingBalls(mockCanvas);
        b.addBall(20, 12);
        expect(b.balls.length).toEqual(1);
        expect(b.balls[0].x).toEqual(20);
        expect(b.balls[0].y).toEqual(12);
      });
    });
  });

  describe("drawBalls", () => {
    let mockCanvas;
    let mockContext;
    beforeEach(() => {
      mockContext = {
        clearRect: jasmine.createSpy("clearRect")
      };
      mockCanvas = {
        getContext: jasmine
          .createSpy("getContext")
          .and.returnValue(mockContext),
        addEventListener: jasmine.createSpy("addEventListener")
      };
    });
    it("should call drawBall method on ball", () => {
      const b = new BouncingBalls(mockCanvas);
      const mockBall = {
        drawBall: jasmine.createSpy("drawBall")
      };
      b.balls = [mockBall];

      b.drawBalls();

      expect(mockBall.drawBall).toHaveBeenCalledWith(mockContext);
    });
  });
});

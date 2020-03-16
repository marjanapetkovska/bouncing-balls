import { BouncingBalls } from "./bouncingBalls";

function init() {
  const bouncingBalls = new BouncingBalls(myCanvas);
  //calls a function at specified intervals(in milliseconds)
  setInterval(bouncingBalls.loop, 1000 / 180);
}
document.addEventListener("DOMContentLoaded", function() {
  init();
});

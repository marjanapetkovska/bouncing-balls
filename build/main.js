(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GRAVITY = 9.81;
var RADIUS = 5;
var COLOR = "#000000";

var Ball = /*#__PURE__*/function () {
  function Ball(x, y) {
    _classCallCheck(this, Ball);

    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.t = 0;
    this.angle = this.getRandomNum(15, 80);
    this.velocity = this.getRandomNum(1, 80); //50-80
  }

  _createClass(Ball, [{
    key: "drawBall",
    value: function drawBall(context) {
      context.beginPath();
      context.fillStyle = COLOR; // Draws a circle at (x, y) coordinates with given radius

      context.arc(this.x, this.y, RADIUS, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    }
  }, {
    key: "updateBall",
    value: function updateBall(height) {
      //x = X + v0*t*cos(Q)
      //y = Y + v0*t*sin(Q) - 1/2g*t^2
      var vx = this.velocity * Math.cos(this.angle * (Math.PI / 180));
      var vy = this.velocity * Math.sin(this.angle * (Math.PI / 180));
      var t = this.t + 0.02;
      this.x = this.x0 + vx * t;
      this.y = this.y0 - vy * t + GRAVITY / 2 * t * t;
      this.t = t;

      if (this.y >= height - RADIUS) {
        this.bounce();
      }
    }
  }, {
    key: "bounce",
    value: function bounce() {
      this.y = -this.y;
      this.x0 = this.x;
      this.y0 = -this.y;
      this.velocity = this.velocity - 5;
      this.t = 0;
    }
  }, {
    key: "getRandomNum",
    value: function getRandomNum(min, max) {
      return Math.random() * (max - min) + min;
    }
  }]);

  return Ball;
}();

exports.Ball = Ball;

},{}],2:[function(require,module,exports){
"use strict";

var _ball = require("./ball");

var context;
var balls = [];

function drawBalls(balls) {
  balls.forEach(function (b) {
    b.drawBall(context);
  });
}

function updateBalls(balls) {
  return balls.forEach(function (b) {
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
  myCanvas.addEventListener("mousedown", function (e) {
    var _getMousePosition = getMousePosition(myCanvas, e),
        x = _getMousePosition.x,
        y = _getMousePosition.y;

    addBall(x, y);
  });
}

function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return {
    x: x,
    y: y
  };
}

function addBall(x, y) {
  var ball = new _ball.Ball(x, y);
  balls.push(ball);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});

},{"./ball":1}]},{},[2]);

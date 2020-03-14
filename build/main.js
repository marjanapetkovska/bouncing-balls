"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var context;
var balls = [];
var G = 9.81;
var RADIUS = 5; //x = X + v0*t*cos(Q)
//y = Y + v0*t*sin(Q) - 1/2g*t^2

function drawBalls(balls) {
  balls.forEach(function(b) {
    context.beginPath();
    context.fillStyle = "#000000"; // Draws a circle at (x, y) coordinates with radius 10

    context.arc(b.x, b.y, RADIUS, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  });
}

function updateBalls(balls) {
  return balls.map(function(b) {
    var vx = b.velocity * Math.cos(b.angle * (Math.PI / 180));
    var vy = b.velocity * Math.sin(b.angle * (Math.PI / 180));
    var t = b.t + 0.02;
    var x = b.x0 + vx * t;
    var y = b.y0 - vy * t + (G / 2) * t * t;
    var x0 = b.x0;
    var y0 = b.y0;
    var velocity = b.velocity;

    if (y >= myCanvas.height - RADIUS) {
      y = -y;
      x0 = x;
      y0 = -y;
      velocity = velocity - 5;
      t = 0;
    }

    return _objectSpread({}, b, {
      t: t,
      x: x,
      y: y,
      x0: x0,
      y0: y0,
      velocity: velocity
    });
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
  balls.push({
    x: x,
    y: y,
    x0: x,
    y0: y,
    t: 0,
    angle: 80,
    //Math.random() * 70,
    velocity: 50 //80
  });
}
document.addEventListener("DOMContentLoaded", function() {
  init();
});

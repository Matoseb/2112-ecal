var Point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;
};
function fromAngleRadius(angle, radius) {
  return new Point(Math.cos(angle) * radius, Math.sin(angle) * radius);
}

var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var count = 250;
var ps = [];
var tgs = [];

function reset() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  ctx.translate(w / 2, h / 2);

  ps = [];
  tgs = [];
  var radius = Math.min(w, h) * 0.5 - 50;
  for (var i = 0; i < count; i++) {
    var p = fromAngleRadius(
      (i / count) * Math.PI * 2,
      radius + Math.random() * 25
    );
    p.speed = Math.random() * 0.1;
    ps.push(p);
    tgs.push(i);

    ctx.beginPath();
    ctx.arc(p.x, p.y, 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  tgs.sort(function (a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  });

  ctx.globalCompositeOperation = "darken";
  ctx.globalAlpha = 0.1;
}
window.addEventListener("resize", reset, false);
window.addEventListener("mousedown", reset, false);
window.addEventListener("touchstart", reset, false);

function draw() {
  requestAnimationFrame(draw);

  var p = new Point();
  var c = new Point();
  ctx.beginPath();
  for (var i = 0; i < ps.length; i++) {
    p = ps[i];
    ctx.moveTo(p.x, p.y);

    c = ps[tgs[i]];

    p.x += (c.x - p.x) * p.speed;
    p.y += (c.y - p.y) * p.speed;
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
}
reset();
draw();

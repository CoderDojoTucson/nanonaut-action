var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var c = canvas.getContext('2d');

var image = new Image();
image.src = 'images/Nanonaut.png';

function start() {
  window.requestAnimationFrame(loop);
}

var x = 0;
var y = 40;

function loop() {
  c.clearRect(0, 0, 800, 600);
  c.drawImage(image, x, y);
  x = x + 1;

  window.requestAnimationFrame(loop);
}

window.addEventListener('load', start);
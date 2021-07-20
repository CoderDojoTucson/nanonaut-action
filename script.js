var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var c = canvas.getContext('2d');

var image = new Image();
image.src = 'images/Nanonaut.png';

function start() {
  c.fillStyle = 'green';
  c.fillRect(10, 10, 30, 30);
  c.drawImage(image, 20, 40);
}

window.addEventListener('load', start);
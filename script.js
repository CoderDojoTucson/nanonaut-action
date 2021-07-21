// CONSTANTS
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var NANONAUT_WIDTH = 181;
var NANONAUT_HEIGHT = 229;
var NANONAUT_START_X = 50;
var NANONAUT_START_Y = 40;
var GROUND_Y = 540;
var BACKGROUND_Y = -200;

// SETUP
var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

var nanonautImage = new Image();
nanonautImage.src = 'images/Nanonaut.png';

// Define background image.
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';

var nanonautX = NANONAUT_START_X;
var nanonautY = NANONAUT_START_Y;

window.addEventListener('load', start);

function start() {
  window.requestAnimationFrame(mainLoop);
}

// MAIN LOOP
function mainLoop() {
  update();
  draw();
  window.requestAnimationFrame(mainLoop);
}

// PLAYER INPUT

// UPDATING
function update() {

}

// DRAWING
function draw() {
  // Draw the sky.
  c.fillStyle = 'LightSkyBlue';
  c.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y - 40);

  // Draw the background.
  c.drawImage(backgroundImage, 0, BACKGROUND_Y);

  // Draw the ground.
  c.fillStyle = 'ForestGreen';
  c.fillRect(0, GROUND_Y - 40, 
             CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  // Draw the Nanonaut.
  c.drawImage(nanonautImage, nanonautX, nanonautY);
}
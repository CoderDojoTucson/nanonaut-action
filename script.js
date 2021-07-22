// CONSTANTS
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var NANONAUT_WIDTH = 181;
var NANONAUT_HEIGHT = 229;
var NANONAUT_START_X = 50;
var NANONAUT_START_Y = 40;
var NANONAUT_Y_ACCELERATION = 1;
var NANONAUT_JUMP_SPEED = 20;
var GROUND_Y = 540;
var BACKGROUND_Y = -200;
var SPACE_KEYCODE = 32;

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

// Set Nanonaut starting location.
var nanonautX = NANONAUT_START_X;
var nanonautY = NANONAUT_START_Y;

// Initial acceleration for Nanonaut.
var nanonautYSpeed = 0;

// Define event listeners for player input.
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

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
// Initialize space key pressed.
var spaceKeyIsPressed = false;

function onKeyDown(event) {
  if (event.keyCode === SPACE_KEYCODE) {
    spaceKeyIsPressed = true;
  }
}

function onKeyUp(event) {
  if(event.keyCode === SPACE_KEYCODE) {
    spaceKeyIsPressed = false;
  }
}

// UPDATING
var nanonautIsInTheAir = false;

function update() {
  // Make Nanonaut jump.
  if (spaceKeyIsPressed && !nanonautIsInTheAir) {
    nanonautYSpeed = -NANONAUT_JUMP_SPEED;
    nanonautIsInTheAir = true;
  }

  // Update Nanonaut location.
  nanonautY = nanonautY + nanonautYSpeed;
  nanonautYSpeed = nanonautYSpeed + NANONAUT_Y_ACCELERATION;
  if (nanonautY > (GROUND_Y - NANONAUT_HEIGHT)) {
    nanonautY = GROUND_Y - NANONAUT_HEIGHT;
    nanonautYSpeed = 0;
    nanonautIsInTheAir = false;
  }
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
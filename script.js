// CONSTANTS
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var NANONAUT_WIDTH = 181;
var NANONAUT_HEIGHT = 229;
var NANONAUT_START_X = 50;
var NANONAUT_START_Y = 40;
var NANONAUT_Y_ACCELERATION = 1;
var NANONAUT_JUMP_SPEED = 20;
var NANONAUT_X_SPEED = 5;
var NANONAUT_NR_FRAMES_PER_ROW = 5;
var NANONAUT_NR_ANIMATION_FRAMES = 7;
var NANONAUT_ANIMATION_SPEED = 4;
var BUSH_X_OFFSET = 150;
var GROUND_Y = 540;
var BACKGROUND_Y = -200;
var BACKGROUND_WIDTH = 1000;
var SPACE_KEYCODE = 32;

// SETUP
var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

// Define background image.
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';

// Define bush images.
var bush1Image = new Image();
bush1Image.src = 'images/bush1.png';
var bush2Image = new Image();
bush2Image.src = 'images/bush2.png';

// Initialize bush objects.
var bushData = generateBushes();

// Define Nanonaut image.
var nanonautImage = new Image();
nanonautImage.src = 'images/animatedNanonaut.png';

// Set Nanonaut starting location.
var nanonautX = NANONAUT_START_X;
var nanonautY = NANONAUT_START_Y;

// Initial acceleration for Nanonaut.
var nanonautYSpeed = 0;

// Initial Nanonaut spritesheet frame.
var nanonautFrameNr = 0;
var gameFrameCounter = 0;

// Setup camera view.
var cameraX = 0;
var cameraY = 0;

// Define event listeners for player input.
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

window.addEventListener('load', start);

function start() {
  window.requestAnimationFrame(mainLoop);
}

function generateBushes() {
  let generatedBushData = [];
  let bushX = 0;
  while (bushX < (2 * CANVAS_WIDTH)) {
    let bushImage;
    if (Math.random() >= 0.5) {
      bushImage = bush1Image;
    } else {
      bushImage = bush2Image;
    }
    generatedBushData.push({
      x: bushX,
      y: 80 + Math.random() * 20,
      image: bushImage
    });
    bushX += 150 + Math.random() * 200;
  }
  return generatedBushData;
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
  // Make Nanonaut run.
  nanonautX = nanonautX + NANONAUT_X_SPEED;

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

  // Update sprite animation.
  gameFrameCounter = gameFrameCounter + 1;
  if (gameFrameCounter % NANONAUT_ANIMATION_SPEED === 0) {
    nanonautFrameNr = nanonautFrameNr + 1;
    if (nanonautFrameNr >= NANONAUT_NR_ANIMATION_FRAMES) {
      nanonautFrameNr = 0;
    }
  }

  // Update camera location.
  cameraX = nanonautX - 150;

  // Update bush locations.
  for (let i = 0; i < bushData.length; i++) {
    if ((bushData[i].x - cameraX) < -CANVAS_WIDTH) {
      bushData[i].x += (2 * CANVAS_WIDTH) + BUSH_X_OFFSET;
    }
  }
}

// DRAWING
function draw() {
  // Draw the sky.
  c.fillStyle = 'LightSkyBlue';
  c.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y - 40);

  // Draw the background.
  let backgroundX = - (cameraX % BACKGROUND_WIDTH);
  c.drawImage(backgroundImage, backgroundX, BACKGROUND_Y);
  c.drawImage(backgroundImage, backgroundX + BACKGROUND_WIDTH, BACKGROUND_Y);

  // Draw the ground.
  c.fillStyle = 'ForestGreen';
  c.fillRect(0, GROUND_Y - 40, 
             CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  // Draw bushes.
  for (let i = 0; i < bushData.length; i++) {
    c.drawImage(bushData[i].image, bushData[i].x - cameraX, GROUND_Y - bushData[i].y - cameraY);
  }

  // Draw the Nanonaut.
  let nanonautSpriteSheetRow = Math.floor(nanonautFrameNr / NANONAUT_NR_FRAMES_PER_ROW);
  let nanonautSpriteSheetColumn = nanonautFrameNr % NANONAUT_NR_FRAMES_PER_ROW;
  let nanonautSpriteSheetX = nanonautSpriteSheetColumn * NANONAUT_WIDTH;
  let nanonautSpriteSheetY = nanonautSpriteSheetRow * NANONAUT_HEIGHT;
  c.drawImage(nanonautImage, nanonautSpriteSheetX, nanonautSpriteSheetY, NANONAUT_WIDTH, NANONAUT_HEIGHT, nanonautX - cameraX, nanonautY - cameraY, NANONAUT_WIDTH, NANONAUT_HEIGHT);
}
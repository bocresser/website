var paddle;
var tiles = [];
var ball;

var politicians = [];
var Earth;
var Heart;

var lives = 0;
var tileWidth;
var boundary;
var screenWidth;
var screenHeight;
var tileSpeed = 4;
var transparency = false;

var startX;
var endX;
var lineLength
var sliderX;
var maxSpeed = 10;
var sliderLocked = false;

var start = false;
var newGame = false;
var newRound = false;
var wait = true;
var win = false;


// function preload() {
//   for (var i = 0; i < 3; i++) {
//     politicians.push(loadImage("../../images/brickbreaker/Politician" + i + ".png"));
//   }
//   Earth = loadImage("../../images/brickbreaker/Earth.png");
//   Heart = loadImage("../../images/brickbreaker/heart.png");
// }


function setup() {
  createCanvas(windowWidth, windowHeight);
  screenHeight = height * 8 / 9;
  screenWidth = screenHeight * 2 / 3;
  boundary = createVector((width - screenWidth) / 2, height - screenHeight);
  tileWidth = ((width - boundary.x * 2) - 39) / 12;
  startX = boundary.x + tileWidth * 5;
  endX = width - boundary.x - tileWidth
  lineLength = endX - startX
  sliderX = startX + (endX - startX) / 4;


  paddle = new Paddle(createVector(width / 2, height * 4 / 5));
  ball = new Ball(createVector(width / 2, height / 2), createVector(0, 1), tileWidth);
  this.reset();
}

function windowResized() {
  setup()
}

this.reset = function() {
  start = false;
  win = false;
  lives = 3;
  newGame = false;
  transparency = false;

  ball.pos = createVector(width / 2, height / 2)
  ball.angle = createVector(0, 1);
  paddle.pos = createVector(width / 2, height * 4 / 5);
  createTiles()
}

function createTiles() {
  tiles.splice(0, tiles.length);
  for (var x = boundary.x + tileWidth * 2 + 6; x <= width - boundary.x - tileWidth * 2 + 6; x += tileWidth + 3) {
    for (var y = boundary.y + tileWidth * 2 + 6; y <= boundary.y + (tileWidth * 4) + 3 * (4 + 1); y += tileWidth + 3) {
      tiles.push(new Tile(createVector(x, y), tileSpeed, tileWidth));
    }
  }
}

function draw() {
  background(100, 150, 0);

  // walls
  push();
  fill(240)
  stroke(50);
  strokeWeight(10);
  rect(boundary.x - 8, boundary.y - 8, width - boundary.x * 2 + 16, height);

  // speed controls
  strokeWeight(7);
  line(startX, boundary.y / 2, endX, boundary.y / 2)
  noStroke()
  fill(50);

  sliderX = constrain(sliderX, startX, endX);
  ball.speed = ((sliderX - startX) / lineLength) * maxSpeed + 3;
  ellipse(sliderX, boundary.y / 2, tileWidth, tileWidth)


  // lives
  // imageMode(CENTER)
  for (var x = boundary.x + tileWidth; x <= boundary.x + tileWidth + tileWidth * lives - 1; x += tileWidth) {
    // image(Heart, x, boundary.y / 2, tileWidth, tileWidth)
    ellipse(x, boundary.y / 2, tileWidth, tileWidth)
  }
  pop();


  for (t = tiles.length - 1; t >= 0; t--) {
    tiles[t].render();
    tiles[t].decaying();
    tiles[t].destroy(t);
  }

  if (start) {
    ball.update();
    ball.hitpaddle();
    ball.hittile();
    ball.hitwalls();
    ball.hitfloor();
    paddle.hittile();
    paddle.update();
  }
  ball.render();
  paddle.render();


  // winning
  var count = 0;
  for (var t = tiles.length - 1; t >= 0; t--) {
    if (tiles[t].decay) {
      count++;
    }
  }
  if (count == tiles.length) {
    win = true;
    newGame = true;
    start = false
    for (var t2 = tiles.length - 1; t2 >= 0; t2--) {
      tiles[t2].tileWidth += 7;
      transparency = true;
    }
  }

  if (newRound) {
    ball.pos = createVector(width / 2, height / 2)
    ball.angle = createVector(0, 1);
    paddle.pos = createVector(width / 2, height * 4 / 5);
    wait = true;
    start = false;
    for (var t3 = tiles.length - 1; t3 >= 0; t3--) {
      if (tiles[t3].decay == true) {
        tiles.splice(t3, 1);
      }
    }
    newRound = false
  }

  if (newGame) {
    push();
    noStroke();
    fill(120, 255, 0);
    rectMode(CENTER);
    rect(width / 2, height / 2, width - boundary.x, height / 6);
    textAlign(CENTER, CENTER);
    textSize(height / 9);
    fill(0);
    if (win) {
      text("WELL DONE", width / 2, height / 2);
    } else {
      text("TRY AGAIN", width / 2, height / 2);
    }
    pop();
  }
}




function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    paddle.speed = 7;
  }
  if (keyCode === LEFT_ARROW) {
    paddle.speed = -7;
  }
  if (key === ' ') {
    if (newGame) {
      reset();
      wait = true;
    } else {
      start = true;
      wait = false;
      newRound = false;
    }
  }
  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    paddle.speed = 0;
  }
}

function mousePressed() {
  if (mouseY > boundary.y) {
    if (start) {
      if (mouseX > width / 2) {
        paddle.speed = 7;
      } else if (mouseX < width / 2) {
        paddle.speed = -7;
      }
    } else; {
      if (newGame) {
        reset();
        wait = true;
      } else {
        start = true;
        wait = false;
        newRound = false;
      }
    }
  }
  // if (mouseX > startX && mouseX < endX); {
  if (dist(mouseX, mouseY, sliderX, boundary.y / 2) < tileWidth / 2) {
    sliderLocked = true;
  }
}

function mouseDragged() {
  if (sliderLocked) {
    sliderX = mouseX;
  }
}

function mouseReleased() {
  paddle.speed = 0;
  sliderLocked = false;
}

function touchMoved() {
 return false; 
}
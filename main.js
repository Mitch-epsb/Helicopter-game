// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";
let PU = document.createElement("img");
PU.src = "img/noFilter.png";
let explo = document.createElement("audio");
explo.src = "sound/explosion.wav";
let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";
let mouseispressed = false;
let best = 0;
// reset
let state;
let heli;
let wall1, wall2, wall3;
let dis;
let power;
let block;
let shrink;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state == "start") {
    drawStart();
  } else if (state == "gameon") {
    rungame();
  } else if (state == "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// EVENTS
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseispressed = true;
  if (state == "start") {
    state = "gameon";
  }
  propeller.play();
}

function mouseupHandler() {
  mouseispressed = false;
}

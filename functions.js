// FUNCTIONS

// Draw Start Screen
function drawStart() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText("DISTANCE: 0", 25, cnv.height - 15);
  ctx.fillText("BEST:" + best, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  //Power Up
  ctx.drawImage(PU, power.x, power.y, power.w, power.h);

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

function rungame() {
  // LOGIC
  moveHeli();
  movewalls();
  collCheck();
  distance();
  powerup();
  blockevent();
  //GAME
  drawGame();
}
function moveHeli() {
  //Apply Grav
  heli.speed += heli.accel;
  if (mouseispressed) {
    heli.speed += -0.6;
  }

  //Max speed
  if (heli.speed > 6) {
    heli.speed = 6;
  } else if (heli.speed < -6) {
    heli.speed = -6;
  }
  //Move Heli
  heli.y += heli.speed;
}
function distance() {
  dis += 1;
  if (dis > best) {
    best = dis;
  }
}

function movewalls() {
  //wall1
  wall1.x += -wall1.s;
  wall1.s += 0.001;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }
  //wall2
  wall2.x += -wall2.s;
  wall2.s += 0.001;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }
  //wall3
  wall3.x += -wall3.s;
  wall3.s += 0.001;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
    let randP = Math.random();
    if (randP < 0.1) {
      power.x = wall3.x;
      power.y = Math.random() * 300 + 100;
      wall3.x += 500;
    }
  }
}
function powerup() {
  power.x += -wall3.s;
}
function collCheck() {
  if (heli.y < shrink.y || heli.y + heli.h > cnv.height - shrink.y) {
    gameover();
  }
  if (
    (heli.y + heli.h > wall1.y &&
      heli.y < wall1.y + wall1.h &&
      heli.x + heli.w > wall1.x &&
      heli.x < wall1.x + wall1.w) ||
    (heli.y + heli.h > wall3.y &&
      heli.y < wall3.y + wall3.h &&
      heli.x + heli.w > wall3.x &&
      heli.x < wall3.x + wall3.w) ||
    (heli.y + heli.h > wall2.y &&
      heli.y < wall2.y + wall2.h &&
      heli.x + heli.w > wall2.x &&
      heli.x < wall2.x + wall2.w)
  ) {
    gameover();
  }
  if (
    heli.y + heli.h > power.y &&
    heli.y < power.y + power.h &&
    heli.x + heli.w > power.x &&
    heli.x < power.x + power.w
  ) {
    dis += dis;
    power.x = -50;
    shrink.var = false;
  }
}
function blockevent() {
  if (dis > 20000) {
    block.x += -2;
    if (block.x < 250 && dis < 100000) {
      block.x = 250;
    } else if (block.x < 550) {
      block.x = 550;
    }
  }
  if (dis % 1000 == 0 && dis % 2000 != 0) {
    shrink.var = true;
  } else if (dis % 1000 == 0) {
    shrink.var = false;
  }
  if (shrink.var) {
    shrink.y += 0.05;
  } else if (shrink.y > 55) {
    shrink.y += -20;
  }
}
function gameover() {
  explo.play();
  state = "gameover";

  setTimeout(reset, 2000);
}
// Draw Game Elements
function drawGame() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, shrink.y);
  ctx.fillRect(0, cnv.height - shrink.y, cnv.width, shrink.y);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText("DISTANCE:" + dis, 25, cnv.height - 15);
  ctx.fillText("BEST:" + best, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  // Draw Wall 1
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);

  //Power Up
  ctx.drawImage(PU, power.x, power.y, power.w, power.h);

  //block
  ctx.fillStyle = "grey";
  ctx.fillRect(block.x, block.y, 800, 500);
}

// Draw Game Over Screen
function drawGameOver() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, shrink.y);
  ctx.fillRect(0, cnv.height - shrink.y, cnv.width, shrink.y);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText("DISTANCE:" + dis, 25, cnv.height - 15);
  ctx.fillText("BEST:" + best, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  //Power Up
  ctx.drawImage(PU, power.x, power.y, power.w, power.h);

  // Draw Wall 1
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + 40, heli.y + 20, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// Helper Functions
function reset() {
  state = "start";
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.3,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    s: 3,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    s: 3,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    s: 3,
  };
  dis = 0;
  power = {
    x: -50,
    y: Math.random() * 300 + 100,
    w: 40,
    h: 40,
  };
  block = {
    x: 800,
    y: 50,
  };
  shrink = {
    y: 50,
    var: false,
  };
}

function drawWalls() {}

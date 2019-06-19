/*
--------------------------DONE------------------------------
[X] start coordinated notes and song 
[X] Start playing the notes when I click on "PLAY"
[X] Whats the problem song.html about?
[X] Check how to change the speed of an audio
[X] Use different keys to play the instruments 
[X] change PlAY for PAUSE AND MAKE IT TRIGGER  song.pause()
[X] Change Play and PAUSE images
[X] Draw and open rule sheet 
[X] Play buttons move in the click event
[X] Actualize score when hitting the correct place
[X] If it is correct add 10, if it is wrong = -20
[X] Change notes to ✨ if the hit is correct
[X] Change song speed by levels

--------------------------TODO------------------------------
IMPORTANT
[X] What happens at the end of the song?
[X] Exit the end of the song without timeout 
[X] Print out the achievements in the end of the game

NOT SO IMPORTANT

[ ] If I hit twice befor the song starts, everything gets inverted
[ ] How to clean code: Take everything that could be outside
[ ] Check why I can zoom in the canvas while I used the vh and vw units in CSS

[ ] Check fonts available in web (doesnt read my font online)
[ ] Full screen
[ ] Complete song!
[ ] The first hit doesnt draw the hit lines
[ ] Check that the way to make the drawing when the instrument is hit is repeted in the event listeners and in the click events
[ ] Change hi-hat sound. I dont like it 🤮

BONUS
[ ] Change letters to real symbol in the drum sheet
[ ] Missing intersection with the circle
[ ] Use more keys to play the instruments
[ ] Draw and move audience on rocks
[ ] Make it work mobile
[ ] More songs!
[ ] Load Maximun score over amout of notes played!
[ ] score -=1 if the note goes by without pressing
*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/*-------------------------- VARIABLES ------------------------------*/
// Constants
const DEBUG = false;
// const DEBUG = true;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const SPEED = 0.6; // 🤔 What is this doing?

const S_DIM = { x: 580, y: 430, width: 200, height: 160 };
const xH_DIM = { x: 370, y: 350, width: 280, height: 80 };
const CC_DIM = { x: 1020, y: 380, width: 260, height: 100 };
const BD_DIM = { x: 925, y: 590, radio: 140 };

const PLAY_DIM = { x: 35, y: 200, width: 110, height: 70 };
const RESET_DIM = { x: 35, y: 280, width: 95, height: 50 };
const RULES_DIM = { x: 210, y: 200, width: 95, height: 50 };
const LEVEL_DIM = { x: 330, y: 200, width: 95, height: 50 };


// Global variables
let frame = 0;
let bg = new Background();
let song = new Song(0); //create atributes --> new Song (Track Id, speed?level)
let score = 0;
let playPause = false;
let BDhit = false;
let Shit = false;
let xHhit = false;
let CChit = false;
let rules = false;
let level = 0;  //CHANGE TO TRUE TO MAKE IT APPEAR
let star = false;

// Sounds
let BDsound = new Sound("audio/Sounds/BD.wav");
let Ssound = new Sound("audio/Sounds/S.wav");
let xHsound = new Sound("audio/Sounds/xH.wav");
let CCsound = new Sound("audio/Sounds/CC.wav");

/*-------------------------- ANIMATION ------------------------------*/
function animation() {
  updateEverything();
  drawEverything(ctx);
  window.requestAnimationFrame(animation);
}
animation();

/*-------------------------- DRAW EVERYTHING ------------------------------*/
// It shouldn't modify any variable
function drawEverything(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  bg.draw(ctx);

  song.draw(ctx);

  drawScore(ctx);

  drawRules(ctx);
  drawBD(ctx);
  drawCC(ctx);
  drawxH(ctx);
  drawS(ctx);
  drawPlay(ctx);
  drawReset(ctx);
  drawLevels(ctx);
}

/*-------------------------- UPDATE EVERYTHING ------------------------------*/
// It shouldn't draw on the canvas
function updateEverything() {
  frame++;
  song.update();
}

/*-------------------------- DRAWING ------------------------------*/


//---SCORE DRAW---
function drawScore(ctx) {
  // TODO
  ctx.save();
  ctx.font = "75px Megan June, Arial";
  ctx.fillStyle = "rgb(255,255,255, 0.6)";
  //TODO
  ctx.fillText(score, 1170, 265);
  ctx.restore();
}

//---BASS DRUM ---
function drawBD(ctx) {
  //Draw the hit zone for DEBUG
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(BD_DIM.x, BD_DIM.y, BD_DIM.radio, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
  //DRAW HIT
  if (BDhit) {
    let img = new Image();
    img.src = "img/onClickImages/BD.png";
    ctx.drawImage(img, 830, 520);
    BDhit = !BDhit;
  }
}

//---CRASH ---
function drawCC(ctx) {
  //Draw the hit zone for DEBUG
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(CC_DIM.x, CC_DIM.y, CC_DIM.width, CC_DIM.height);
    ctx.restore();
  }
  //DRAW HIT
  if (CChit) {
    let img = new Image();
    img.src = "img/onClickImages/CC.png";
    ctx.drawImage(img, 890, 295);
    CChit = !CChit;
  }
}

//---HI-HAT ---
function drawxH(ctx) {
  //Draw the hit zone for DEBUG
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(xH_DIM.x, xH_DIM.y, xH_DIM.width, xH_DIM.height);
    ctx.restore();
  }
  if (xHhit) {
    let img = new Image();
    img.src = "img/onClickImages/xH.png";
    ctx.drawImage(img, 345, 310);
    xHhit = !xHhit;
  }
}

//---SNARE ---
function drawS(ctx) {
  //Draw the hit zone for DEBUG
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(S_DIM.x, S_DIM.y, S_DIM.width, S_DIM.height);
    ctx.restore();
  }
  if (Shit) {
    let img = new Image();
    img.src = "img/onClickImages/S.png";
    ctx.drawImage(img, 580, 375);
    Shit = !Shit;
  }
}

//--- PLAY ---
function drawPlay(ctx) {
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(PLAY_DIM.x, PLAY_DIM.y, PLAY_DIM.width, PLAY_DIM.height);
    ctx.restore();
  }

  ctx.save();
  ctx.font = "75px Megan June, Arial";
  ctx.fillStyle = "rgb(255,255,255, 0.6)";
  if (!playPause) {
    ctx.fillText("PLAY", PLAY_DIM.x + 8, PLAY_DIM.y + 65); // Random + to go to the center of the rectangle
  } else ctx.fillText("PAUSE", PLAY_DIM.x + 8, PLAY_DIM.y + 65);
  ctx.restore();
}

// ---RESET---
function drawReset(ctx) {
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(RESET_DIM.x, RESET_DIM.y, RESET_DIM.width, RESET_DIM.height);
    ctx.restore();
  }

  ctx.save();
  ctx.font = "40px Megan June, Arial";
  ctx.fillStyle = "black";
  if (song.track.currentTime !== 0 && !playPause) {
    ctx.fillText("RESET", RESET_DIM.x + 6, RESET_DIM.y + 35);
  }
  ctx.restore();
}

//---RULES---
function drawRules(ctx) {
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(RULES_DIM.x, RULES_DIM.y, RULES_DIM.width, RULES_DIM.height);
    ctx.restore();
  }

  if (rules) {
    let img = new Image();
    img.src = "img/Rules.png";
    ctx.drawImage(img, 0, 0);
  }
}

//---LEVEL---
function drawLevels(ctx) {
  if (DEBUG) {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(LEVEL_DIM.x, LEVEL_DIM.y, LEVEL_DIM.width, LEVEL_DIM.height);
    ctx.restore();
  }

  if (level) {
    let img = new Image();
    img.src = "/img/Levels.png";
    ctx.drawImage(img, 0, 0);
  }
}

/*-------------------------- KEY EVENTS ------------------------------*/
// Listen for key events
document.onkeydown = event => {
  console.log(event.keyCode);

  if (event.keyCode === 32) {
    BDhit = !BDhit;
    BDsound.play();

    console.log("Bass Drum hit!");
    song.hit("BD");
  }

  if (event.keyCode === 68 || 
      event.keyCode === 70 || 
      event.keyCode === 67 ||
      event.keyCode === 71 
      ){
    Shit = !Shit;
    //Play sound
    Ssound.play();
    console.log(" Snare hit!");
    song.hit("S");
  }

  if (event.keyCode === 72 || event.keyCode === 74 || event.keyCode === 78) {
    xHhit = !xHhit;
    //Play sound
    xHsound.play();

    console.log("Hi-hat hit!");
    song.hit("xH");
  }

  if (
    event.keyCode === 84 ||
    event.keyCode === 82 ||
    event.keyCode === 89 ||
    event.keyCode === 85
  ) {
    CChit = !CChit;
    CCsound.play();
    console.log("Crash hit!");
    song.hit("CC");
  }

  if (event.keyCode === 13) {
    if (song.track.currentTime === 0) {
      song.play();
      playPause = !playPause;
    } else {
      song.pause();
      playPause = !playPause;
    }
  }

  //OPEN RULES
  if (event.keyCode === 27 && rules) rules = !rules;

  //CHOOSE LEVELS
  if (event.keyCode === 49 && level) song.speed = 0.3;
  if (event.keyCode === 50 && level) song.speed = 0.6;
  if (event.keyCode === 51 && level) song.speed = 1;
  level = false;
};

/*-------------------------- CLICK EVENTS ------------------------------*/

canvas.onclick = e => {
  //Thank you Seb 🙏
  //This code is to give the same values of x & y to the canvas and the click events
  let boundRect = canvas.getBoundingClientRect();
  let possitionX = Math.floor(
    (e.clientX - boundRect.left) * (canvas.width / boundRect.width)
  );
  let possitionY = Math.floor(
    (e.clientY - boundRect.top) * (canvas.height / boundRect.height)
  );
  // console.log(possitionX, possitionY)

  //----- Instruments events------

  //SNARE HIT
  if (
    S_DIM.x <= possitionX &&
    possitionX <= S_DIM.x + S_DIM.width &&
    S_DIM.y <= possitionY &&
    possitionY <= S_DIM.y + S_DIM.height
  ) {
    console.log("Snare hit!");
    mySound = new Sound("audio/Sounds/S.wav");
    mySound.play();
    Shit = !Shit;
  }
  //HI-HAT HIT
  if (
    xH_DIM.x <= possitionX &&
    possitionX <= xH_DIM.x + xH_DIM.width &&
    xH_DIM.y <= possitionY &&
    possitionY <= xH_DIM.y + xH_DIM.height
  ) {
    console.log("Hi-Hat hit!");
    mySound = new Sound("audio/Sounds/xH.wav");
    mySound.play();
    xHhit = !xHhit;
  }
  //CRASH HIT
  if (
    CC_DIM.x <= possitionX &&
    possitionX <= CC_DIM.x + CC_DIM.width &&
    CC_DIM.y <= possitionY &&
    possitionY <= CC_DIM.y + CC_DIM.height
  ) {
    console.log("Crash hit!");
    mySound = CCsound;
    mySound.play();
    CChit = !CChit;
  }

  //DRUM HIT
  //TODO
  // If the possition X is inside the distance between the center and the radius

  //------ Game events -------

  // ---PLAY--
  if (
    PLAY_DIM.x <= possitionX &&
    possitionX <= PLAY_DIM.x + PLAY_DIM.width &&
    PLAY_DIM.y <= possitionY &&
    possitionY <= PLAY_DIM.y + PLAY_DIM.height
  ) {
    console.log("Play!!!");
    if (song.track.currentTime === 0) {
      song.play();
      playPause = !playPause;
    } else {
      song.pause();
      playPause = !playPause;
    }
  }

  // ---RULES--
  if (
    RULES_DIM.x <= possitionX &&
    possitionX <= RULES_DIM.x + RULES_DIM.width &&
    RULES_DIM.y <= possitionY &&
    possitionY <= RULES_DIM.y + RULES_DIM.height
  ) {
    console.log("Rules!");
    rules = !rules;
  }

  // ---RESET--
  if (
    RESET_DIM.x <= possitionX &&
    possitionX <= RESET_DIM.x + RESET_DIM.width &&
    RESET_DIM.y <= possitionY &&
    possitionY <= RESET_DIM.y + RESET_DIM.height
  ) {
    console.log("Reset!");
    location.reload();
  }
  if (
    LEVEL_DIM.x <= possitionX &&
    possitionX <= LEVEL_DIM.x + LEVEL_DIM.width &&
    LEVEL_DIM.y <= possitionY &&
    possitionY <= LEVEL_DIM.y + LEVEL_DIM.height
  ) {
    level = 3
    console.log("Level!");
    // drawLevels();
  }
};

/*-------------------------- REORGANIZE ------------------------------*/

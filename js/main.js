function doneList () {
//   --------------------------DONE 19/06/2019------------------------------
// [X] start coordinated notes and song 
// [X] Start playing the notes when I click on "PLAY"
// [X] Whats the problem song.html about?
// [X] Check how to change the speed of an audio
// [X] Use different keys to play the instruments 
// [X] change PlAY for PAUSE AND MAKE IT TRIGGER  song.pause()
// [X] Change Play and PAUSE images
// [X] Draw and open rule sheet 
// [X] Play buttons move in the click event
// [X] Actualize score when hitting the correct place
// [X] If it is correct add 10, if it is wrong = -20
// [X] Change notes to ✨ if the hit is correct
// [X] Change song speed by levels
// [X] What happens at the end of the song?
// [X] Exit the end of the song without timeout 
// [X] Print out the achievements in the end of the game
// [X] Change rule image
// [X] I cant see the levels outside the live server
// [X] Check fonts available in web (doesnt read my font online)
// [X] Add sound to the end of the song!
// --------------------------DONE 20/06/2019------------------------------
// [X] Draw buttons with button shape
// [X] Complete song!
// [X] Change ending text according to the score
// [X] Use the arrows fot another way of playing 
// [X] change the position of correct hit S
}

function TODOList (){
  /*
  --------------------------TODO------------------------------
  IMPORTANT
  [ ] Sounds dont work outside the live server but they work online 🤔
  [ ] If I hit twice before the song starts, everything gets fucked 🤯
  [ ] Check sound loop at the end of the song 
  
  NOT SO IMPORTANT
  
  [ ] Draw crowd
  [ ] Check the correct hit style
  [ ] Change hi-hat sound. I dont like it 🤮
  [ ] Draw long separation line between compases
  
  [ ] FULL OF BUGS 🐞 when the game is paused, you can still earn points
  [ ] How to clean code: Take everything that could be outside
  [ ] Check why I can zoom in the canvas while I used the vh and vw units in CSS
  
  BONUS
  [ ] Full screen
  [ ] The first hit doesnt draw the hit lines
  [ ] Change letters to real symbol in the drum sheet
  [ ] Missing intersection with the circle for click event
  [ ] Draw and move audience on rocks
  [ ] Make it work mobile
  [ ] More songs!
  [ ] Check that the way to make the drawing when the instrument is hit is repeted in the event listeners and in the click events
  [ ] What is chapaband.html inside my sounds?
  [ ] score -=1 if the note goes by without pressing
  */
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/*-------------------------- ⬇️ VARIABLES ⬇️ ------------------------------*/
// Constants
const DEBUG = false;
// const DEBUG = true;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const SPEED = 0.6; // 🤔 What is this doing?

const S_DIM = { x: 580, y: 430, width: 200, height: 160 };
const xH_DIM = { x: 370, y: 350, width: 280, height: 80 };
const CC_DIM = { x: 1020, y: 380, width: 260, height: 100 };
// const BD_DIM = { x: 925, y: 590, radio: 140 };
const BD_DIM = { x: 780, y: 480, width: 300, height: 260 };

const PLAY_DIM = { x: 35, y: 200, width: 110, height: 70 };
const RESET_DIM = { x: 35, y: 280, width: 95, height: 50 };
const RULES_DIM = { x: 210, y: 200, width: 95, height: 50 };
const LEVEL_DIM = { x: 330, y: 200, width: 95, height: 50 };
const END_DIM = { x: 1175, y: 60, width: 100, height: 70 };

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
let level = 0; //CHANGE TO TRUE TO MAKE IT APPEAR
let star = false;

// Sounds
let BDsound = new Sound("audio/Sounds/BD.wav");
let Ssound = new Sound("audio/Sounds/S.wav");
let xHsound = new Sound("audio/Sounds/xH.wav");
let CCsound = new Sound("audio/Sounds/CC.wav");
let crowdSound = new Audio("audio/Sounds/crowd.mp3");

/*---------------------------- ⬇️ ANIMATION ⬇️-------------------------------------*/
function animation() {
  updateEverything();
  drawEverything(ctx);
  window.requestAnimationFrame(animation);
}
animation();

/*---------------------------⬇️ DRAW EVERYTHING ⬇️--------------------------------*/
// It shouldn't modify any variable
function drawEverything(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  bg.draw(ctx);

  song.draw(ctx);

  drawScore(ctx);

  drawCrowd(ctx)
  endOfGame(ctx);
  drawPlay(ctx);
  drawRules(ctx);
  drawBD(ctx);
  drawCC(ctx);
  drawxH(ctx);
  drawS(ctx);
  drawReset(ctx);
  drawLevels(ctx);
}

/*--------------------------⬇️ UPDATE EVERYTHING ⬇️----------------/--------------*/
// It shouldn't draw on the canvas
function updateEverything() {
  frame++;
  song.update();
}

/*------------------------------⬇️ DRAWING ⬇️-------------------------------------*/

//---- END OF SONG ----
function endOfGame(ctx) {
  //Draw the hit zone for DEBUG
  if (DEBUG) {
    ctx.save();
    // //Uncomment to draw image for debug
    // let img = new Image();
    // img.src = "img/endOfSong.png";
    // ctx.drawImage(img, 0, 0);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.strokeRect(670, 250, 120, 70);
    ctx.strokeRect(END_DIM.x, END_DIM.y, END_DIM.width, END_DIM.height);
    ctx.restore();
  }

  if (song.track.currentTime === song.track.duration) {
    ctx.save();
    let img = new Image();
    img.src = "img/endOfSong.png";
    ctx.drawImage(img, 0, 0);

    ctx.font = "60px  Megan June, Arial";
    ctx.fillStyle = "white";
    ctx.fillText(score, 700, 305);

    ctx.save();
    ctx.font = "95px  Megan June, Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if (score < 0) {
      ctx.fillText("Ups, keep practising!", 670, 200);
    } else if (score >= 0 && score < 200) {
      ctx.fillText("Not too bad 💃 ", 670, 200);
    } else if (score > 0 && score < 1000) {
      ctx.fillText("Keep up 🥁 !", 670, 200);
    } else ctx.fillText("Woooohooo 🤘🏽", 670, 200);
    ctx.restore();

    ctx.restore();
    crowdSound.play();
    if (crowdSound.currentTime > 6) {
      // This is not working correctly
      crowdSound.pause();
    }
  }
}

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

    //// SQUARE
    ctx.strokeRect(BD_DIM.x, BD_DIM.y,BD_DIM.width,BD_DIM.height)

    ////CIRCLE
    // ctx.beginPath();
    // ctx.arc(BD_DIM.x, BD_DIM.y, BD_DIM.radio, 0, 2 * Math.PI);
    // ctx.stroke();
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
  ctx.globalAlpha = "0.7";
  ctx.fillStyle = "white";
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
    img.src = "img/Levels.png";
    ctx.drawImage(img, 0, 0);
  }

  ctx.save();
  let levelText;
  if (song.speed === 0.4) levelText = "1";
  if (song.speed === 0.6) levelText = "2";
  if (song.speed === 1) levelText = "3";

  ctx.fillStyle = "rgb(255,255,255,0.7)";
  ctx.font = "60px Megan June, Arial";
  ctx.fillText(levelText, 445, 245);
  ctx.restore();
}

function drawCrowd(ctx) {
  // let img = new Image();
  // img.src = "img/Crowd01.png";
  // ctx.drawImage(img, 0, 0);

  // let img2 = new Image();
  // img2.src = "img/Crowd02.png";
  // ctx.drawImage(img2, 0, 0);

  // let img3 = new Image();
  // img3.src = "img/Crowd03.png";
  // ctx.drawImage(img3, 0, 0);
  
  // let img4 = new Image();
  // img4.src = "img/Crowd04.png";
  // ctx.drawImage(img4, 0, 0);
  
}

/*-----------------------------------⬇️ KEY EVENTS ⬇️------------------------------*/
// Listen for key events
document.onkeydown = event => {
  console.log(event.keyCode);
  
  // BASS DRUM HIT
  if (
    event.keyCode === 32 || 
    event.keyCode === 86 || 
    event.keyCode === 39 || 
    event.keyCode === 66) {
    BDhit = !BDhit;
    BDsound.play();

    console.log("Bass Drum hit!");
    song.hit("BD");
  }
  // SNARE HIT
  if (
    event.keyCode === 68 ||
    event.keyCode === 70 ||
    event.keyCode === 67 ||
    event.keyCode === 83 ||
    event.keyCode === 40 ||
    event.keyCode === 71
  ) {
    Shit = !Shit;
    //Play sound
    Ssound.play();
    console.log(" Snare hit!");
    song.hit("S");
  }
  // HI-HAT HIT
  if (
    event.keyCode === 72 || 
    event.keyCode === 74 || 
    event.keyCode === 37 || 
    event.keyCode === 78) {
    xHhit = !xHhit;
    //Play sound
    xHsound.play();

    console.log("Hi-hat hit!");
    song.hit("xH");
  }

  //CRASH HIT
  if (
    event.keyCode === 84 ||
    event.keyCode === 82 ||
    event.keyCode === 89 ||
    event.keyCode === 38 ||
    event.keyCode === 85
  ) {
    CChit = !CChit;
    CCsound.play();
    console.log("Crash hit!");
    song.hit("CC");
  }

  //PLAY
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
  if (event.keyCode === 49) song.speed = 0.4;
  if (event.keyCode === 50) song.speed = 0.6;
  if (event.keyCode === 51) song.speed = 1;
  level = false;
};

/*----------------------------------⬇️ CLICK EVENTS ⬇️ ------------------------------*/

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
  //TODO --> If the possition X is inside the distance between the center and the radius
  if (
    BD_DIM.x <= possitionX &&
    possitionX <= BD_DIM.x + BD_DIM.width &&
    BD_DIM.y <= possitionY &&
    possitionY <= BD_DIM.y + BD_DIM.height
  ) {
    console.log("BD hit!");
    mySound = BDsound;
    mySound.play();
    BDhit = !BDhit;
  }

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
  // ---END OF GAME--
  if (
    END_DIM.x <= possitionX &&
    possitionX <= END_DIM.x + END_DIM.width &&
    END_DIM.y <= possitionY &&
    possitionY <= END_DIM.y + END_DIM.height
  ) {
    console.log("Reset!");
    location.reload();
  }

  //--- LEVEL ----
  if (
    LEVEL_DIM.x <= possitionX &&
    possitionX <= LEVEL_DIM.x + LEVEL_DIM.width &&
    LEVEL_DIM.y <= possitionY &&
    possitionY <= LEVEL_DIM.y + LEVEL_DIM.height
  ) {
    if (song.track.currentTime === 0) {
      level = true;
      console.log("Level!");
    } else location.reload();
  }
};

/*-------------------------------------⬇️ REORGANIZE  ⬇️------------------------------*/

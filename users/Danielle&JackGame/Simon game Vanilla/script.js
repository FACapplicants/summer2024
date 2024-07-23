//The Simon game is a memory game.
//The aim is to remember the sequence shown, and to submit the same sequence.
//The sequence builds the higher the level you go
//A wrong move ends the game.

const buttonColours = ["red", "green", "blue", "yellow"];

let gamePattern = [];

let userPattern = [];

let timesClicked = 0;

let gameLevel = 1;

const redButton = document.getElementById("red");
const greenButton = document.getElementById("green");
const blueButton = document.getElementById("blue");
const yellowButton = document.getElementById("yellow");
const startButton = document.getElementById("start-button");
const redAudio = document.getElementById("red_button_sound");
const greenAudio = document.getElementById("green_button_sound");
const blueAudio = document.getElementById("blue_button_sound");
const yellowAudio = document.getElementById("yellow_button_sound");
const levelCounter = document.getElementById("level-counter");

const modalBtn = document.getElementById("modal-button");
const modalContainer = document.querySelector(".modal-container");

// Resets all the game arrays
function resetGame() {
  gamePattern = [];
  userPattern = [];
  timesClicked = [];
  gameLevel = 1;
  levelCounter.innerHTML = gameLevel;
}

// Generates random number out of 4 (as there are 4 colours)
function randomNumber() {
  return Math.floor(Math.random() * 4);
}

// Uses a random number to push to game array & generate a random color
function pushToGameArray() {
  const myRandomNumber = randomNumber();
  gamePattern.push(buttonColours[myRandomNumber]);
}

let i = 0;

let gameSpeed = 500;

function playLoop() {
  //  creates a loop function
  setTimeout(function () {
    if (gamePattern[i] === "red") {
      redAudio.play();
      redButton.classList.add("transparent");
      setTimeout(() => {
        redButton.classList.remove("transparent");
      }, 300);
    } else if (gamePattern[i] === "green") {
      greenAudio.play();
      greenButton.classList.add("transparent");
      setTimeout(() => {
        greenButton.classList.remove("transparent");
      }, 300);
    } else if (gamePattern[i] === "blue") {
      blueAudio.play();
      blueButton.classList.add("transparent");
      setTimeout(() => {
        blueButton.classList.remove("transparent");
      }, 300);
    } else if (gamePattern[i] === "yellow") {
      yellowAudio.play();
      yellowButton.classList.add("transparent");
      setTimeout(() => {
        yellowButton.classList.remove("transparent");
      }, 300);
    }

    i++; //  increment the counter
    if (i <= gameLevel) {
      playLoop();
    } else i = 0;
  }, gameSpeed);
}

// Resets game, then pushes to the gamePattern array 4 times so that 4 colours are selected
function startRound() {
  pushToGameArray();
  levelCounter.innerHTML = gameLevel;
  playLoop();
}

// Compares the user pattern against the game pattern.
// if the user pattern doesnt match the game pattern, the game immediately ends and displays
// loser in the console, and a alert message to the user.
// However if it does match, the game continues and we start a new pattern again.

function checkWin() {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      console.log("LOSER");
      alert("YOU LOSE! BETTER LUCK NEXT TIME!");
      resetGame();
      return;
    }
  }

  if (userPattern.length === gamePattern.length) {
    console.log("WINNER");
    gameLevel++;
    userPattern = [];
    timesClicked = 0;
    startRound();
  }
}

//This relates to the user clicking the start button.
// On the user's click, we trigger the startRound function
startButton.addEventListener("click", function () {
  resetGame();
  startRound();
});

// Pushes "red" to the userPattern, adds 1 to timesClicked, and checks for a win
redButton.addEventListener("click", function () {
  userPattern.push("red");
  timesClicked++;
  redAudio.play();
  checkWin();
});

// Pushes "green" to the userPattern, adds 1 to timesClicked, and checks for a win
greenButton.addEventListener("click", function () {
  userPattern.push("green");
  timesClicked++;
  greenAudio.play();
  checkWin();
});

// Pushes "blue" to the userPattern, adds 1 to timesClicked, and checks for a win
blueButton.addEventListener("click", function () {
  userPattern.push("blue");
  timesClicked++;
  blueAudio.play();
  checkWin();
});

// Pushes "green" to the userPattern, adds 1 to timesClicked, and checks for a win
yellowButton.addEventListener("click", function () {
  userPattern.push("yellow");
  timesClicked++;
  checkWin();
  yellowAudio.play();
});

modalBtn.addEventListener("click", function () {
  modalContainer.classList.add("hide");
});

/*
UPGRADE IDEAS:
- Fail noise e.g. buzzer or sad trombone
- User can increase or decrease speed
- High score record
- Bug when user clicks 'start' button while playing
- Easy/hard mode
- */

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

// Resets all the game arrays
function resetGame() {
  gamePattern = [];
  userPattern = [];
  timesClicked = [];
  gameLevel = 1;
}

// Generates random number out of 4 (as there are 4 colours)
function randomNumber() {
  return Math.floor(Math.random() * 4);
}

// Uses a random number to push to game array
function pushToGameArray() {
  const myRandomNumber = randomNumber();
  gamePattern.push(buttonColours[myRandomNumber]);
}

let i = 0;

function playLoop() {
  //  create a loop function
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
  }, 1000);
}

// Resets game, then pushes to the gamePattern array 4 times so that 4 colours are selected
// Obviously will start with one, then two, then three, onwards colours. I started with four to
// get the game logic going
// Need to get a timeout going on this so that it selects them slowly rather than all at once
function startRound() {
  pushToGameArray();
  levelCounter.innerHTML = gameLevel;
  playLoop();
}

// Checks the elements of the gamePattern and the userPattern, then
// console logs LOSER until they match, then when they match console logs WINNER
function checkWin() {
  let consistencyCounter = 0;
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] === userPattern[i]) {
      consistencyCounter++;
    }
  }
  if (consistencyCounter === gameLevel && timesClicked === gameLevel) {
    console.log("WINNER");
    gameLevel++;
    userPattern = [];
    timesClicked = 0;
    startRound();
  } else if (timesClicked === gameLevel) {
    console.log("LOSER");
  }
}

startButton.addEventListener("click", startRound);

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

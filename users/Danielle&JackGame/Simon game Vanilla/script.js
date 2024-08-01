//The Simon game is a memory game.
//The aim is to remember the sequence shown, and to submit the same sequence.
//The sequence builds the higher the level you go
//A wrong move ends the game.

// Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and start an oscillator
function createAndStartOscillator(frequency, duration) {
  const oscillator = audioCtx.createOscillator();
  oscillator.waveType = "square";
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

const redFrequency = 300;
const greenFrequency = 400;
const blueFrequency = 500;
const yellowFrequency = 600;

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

const userDifficultyDropdown = document.getElementById("user-difficulty");

let gameSpeed = 750;
let lightSpeed = 300;
let playerDuration = 0.3;
let ComputerDuration = 0.4;

const changeDifficulty = () => {
  resetGame();
  startRound();

  const myVal = userDifficultyDropdown.value;

  switch (myVal) {
    case "easy":
      gameSpeed = 1200;
      lightSpeed = 300;
      break;
    case "normal":
      gameSpeed = 750;
      lightSpeed = 300;
      break;
    case "hard":
      gameSpeed = 400;
      lightSpeed = 200;
      playerDuration = 0.2;
      ComputerDuration = 0.2;
      break;
    case "impossible":
      gameSpeed = 250;
      lightSpeed = 100;
      ComputerDuration = 0.175;
      playerDuration = 0.075;
      break;
  }
};

userDifficultyDropdown.addEventListener("change", changeDifficulty);

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

function playLoop() {
  setTimeout(function () {
    if (gamePattern[i] === "red") {
      createAndStartOscillator(redFrequency, ComputerDuration);
      redButton.classList.add("transparent");
      setTimeout(() => {
        redButton.classList.remove("transparent");
      }, lightSpeed);
    } else if (gamePattern[i] === "green") {
      createAndStartOscillator(greenFrequency, ComputerDuration);

      greenButton.classList.add("transparent");
      setTimeout(() => {
        greenButton.classList.remove("transparent");
      }, lightSpeed);
    } else if (gamePattern[i] === "blue") {
      createAndStartOscillator(blueFrequency, ComputerDuration);

      blueButton.classList.add("transparent");
      setTimeout(() => {
        blueButton.classList.remove("transparent");
      }, lightSpeed);
    } else if (gamePattern[i] === "yellow") {
      createAndStartOscillator(yellowFrequency, ComputerDuration);
      yellowButton.classList.add("transparent");
      setTimeout(() => {
        yellowButton.classList.remove("transparent");
      }, lightSpeed);
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

const userButtonClick = (buttonColour, frequency) => {
  userPattern.push(buttonColour);
  timesClicked++;
  createAndStartOscillator(frequency, playerDuration);
  checkWin();
};

// Pushes "red" to the userPattern, adds 1 to timesClicked, and checks for a win
redButton.addEventListener("click", function () {
  userButtonClick("red", redFrequency);
});

// Pushes "green" to the userPattern, adds 1 to timesClicked, and checks for a win
greenButton.addEventListener("click", function () {
  userButtonClick("green", greenFrequency);
});

// Pushes "blue" to the userPattern, adds 1 to timesClicked, and checks for a win
blueButton.addEventListener("click", function () {
  userButtonClick("blue", blueFrequency);
});

// Pushes "green" to the userPattern, adds 1 to timesClicked, and checks for a win
yellowButton.addEventListener("click", function () {
  userButtonClick("yellow", yellowFrequency);
});

modalBtn.addEventListener("click", function () {
  modalContainer.classList.add("hide");
  startRound();
});

/*
UPGRADE IDEAS:
- Fail noise e.g. buzzer or sad trombone
- User can increase or decrease speed
- High score record
- Bug when user clicks 'start' button while playing
- Easy/hard mode
- */

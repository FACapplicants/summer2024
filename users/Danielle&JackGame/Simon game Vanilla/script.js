//The Simon game is a memory game.
//The aim is to remember the sequence shown, and to submit the same sequence.
//The sequence builds the higher the level you go
//A wrong move ends the game.

// Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and start an oscillator
function createAndStartOscillator(frequency, duration) {
  const oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

// Frequencies for buttons
const redFrequency = 349.23;
const greenFrequency = 392;
const blueFrequency = 440;
const yellowFrequency = 523.25;

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

const gameOverBtn = document.getElementById("game-over-btn");
const gameOverModal = document.querySelector(".game-over-modal");

// Set default speeds for the speed computer plays sounds/lights, the time the lights
// flash for, the duration of the player's sounds, and duration of the computer's sounds
let gameSpeed = 750;
let lightSpeed = 300;
let playerDuration = 0.3;
let ComputerDuration = 0.4;

// Utility function for changing the values above
const handleDifficultyChange = (
  newGameSpeed,
  newLightSpeed,
  newPlayerDuration,
  newComputerDuration
) => {
  (gameSpeed = newGameSpeed),
    (lightSpeed = newLightSpeed),
    (playerDuration = newPlayerDuration),
    (ComputerDuration = newComputerDuration);
};

// Resets game and starts round, then uses a switch statement to change above values
// depending on user selection of game difficulty
const changeDifficulty = () => {
  resetGame();
  startRound();

  const myVal = userDifficultyDropdown.value;

  switch (myVal) {
    case "easy":
      handleDifficultyChange(1000, 300, 0.3, 0.4);

      break;
    case "normal":
      handleDifficultyChange(750, 300, 0.3, 0.4);

      break;
    case "hard":
      handleDifficultyChange(400, 200, 0.2, 0.2);

      break;
    case "impossible":
      handleDifficultyChange(250, 100, 0.075, 0.175);

      break;
  }
};

userDifficultyDropdown.addEventListener("change", changeDifficulty);

// Resets the game completely
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

// Uses a random number to push one random colour to the gameArray
function pushRandomColourToGameArray() {
  const myRandomNumber = randomNumber();
  gamePattern.push(buttonColours[myRandomNumber]);
}

const playLights = (chosenButton) => {
  chosenButton.classList.add("transparent");
  setTimeout(() => {
    chosenButton.classList.remove("transparent");
  }, lightSpeed);
};

// Defined in the global scope so that the playSoundsAndLights function
// does not loop endlessly
let i = 0;

function playSoundsAndLights() {
  setTimeout(function () {
    switch (gamePattern[i]) {
      case "red":
        createAndStartOscillator(redFrequency, ComputerDuration);
        playLights(redButton);
        break;
      case "green":
        createAndStartOscillator(greenFrequency, ComputerDuration);
        playLights(greenButton);
        break;
      case "blue":
        createAndStartOscillator(blueFrequency, ComputerDuration);
        playLights(blueButton);
        break;
      case "yellow":
        createAndStartOscillator(yellowFrequency, ComputerDuration);
        playLights(yellowButton);
        break;
    }

    i++; //  increment the counter
    if (i <= gameLevel) {
      playSoundsAndLights();
    } else i = 0;
  }, gameSpeed);
}

// Resets game, then pushes to the gamePattern array 4 times so that 4 colours are selected
function startRound() {
  pushRandomColourToGameArray();
  levelCounter.innerHTML = gameLevel;
  playSoundsAndLights();
}

// Compares the user pattern against the game pattern.
// if the user pattern doesnt match the game pattern, the game immediately ends and displays
// loser in the console, and a alert message to the user.
// However if it does match, the game continues and we start a new pattern again.

function checkUserInput() {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      console.log("LOSER");
      gameOverModal.classList.remove("hide");
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

// Pushes user choice to userPattern array, adds 1 to timesClicked
// Plays the sound and colour of the user's choice, and checks for correct input
const userButtonClick = (buttonColour, frequency) => {
  userPattern.push(buttonColour);
  timesClicked++;
  createAndStartOscillator(frequency, playerDuration);
  checkUserInput();
};

redButton.addEventListener("click", function () {
  userButtonClick("red", redFrequency);
});

greenButton.addEventListener("click", function () {
  userButtonClick("green", greenFrequency);
});

blueButton.addEventListener("click", function () {
  userButtonClick("blue", blueFrequency);
});

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
gameOverBtn.addEventListener("click", function () {
  gameOverModal.classList.add("hide");
  startRound();
});

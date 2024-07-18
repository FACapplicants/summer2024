const choices = ['paper', 'rock', 'scissors'];
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const result = document.getElementById('result');
const loseAudio = document.querySelector('#audio-losing');
const winAudio = document.querySelector('#audio-winning');

//that will contain all the logic of the game
const gameLogic =(playerChoice) => {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let outcome='';

  if (playerChoice === computerChoice) {
    outcome = "IT'S A TIE";
  } else {
    switch(playerChoice) {
        case "rock":
          outcome = (computerChoice === 'scissors') ? 'YOU WIN!' : "YOU LOSE!";
          break;
        case "paper":
          outcome = (computerChoice === 'rock') ? 'YOU WIN!' : 'YOU LOSE!';
          break;
        case 'scissors':
          outcome = (computerChoice === 'paper') ? 'YOU WIN!' : "YOU LOSE!";
          break;
    }
  }
  playerScore.textContent = `PLAYER: ${playerChoice}`;
  computerScore.textContent = `COMPUTER: ${computerChoice}`;
  result.textContent = outcome;

  result.classList.remove('bold', 'italic');

  // Pause and reset both audio elements before playing the new sound
  winAudio.pause();
  winAudio.currentTime = 0;
  loseAudio.pause();
  loseAudio.currentTime = 0;

  switch(outcome) {
      case 'YOU WIN!':
        result.classList.add('bold');
        winAudio.play();
        break;
      case "YOU LOSE!":
        result.classList.add('italic');
        loseAudio.play();
        break;
  }
}
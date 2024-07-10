//that will contain all the logic of the game
const gameLogic =() => {
  const choices = ['paper', 'rock', 'scissors'];

  const computerChoices = choices[Math.floor(Math.random() * 3)];
  

  const paper = document.getElementById('paper');
  const rock = document.getElementById('rock');
  const scissors = document.getElementById('scissors');
}
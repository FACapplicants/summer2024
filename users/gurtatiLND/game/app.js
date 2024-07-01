//that will contain all the logic of the game
const gameLogic =() => {
    let player = 0;
    let computer = 0;
    let movesCounter = 0; //moves which will keep the record of the player’s score, computer’s score, and moves completed respectively.


  const playGame = () => {
      const paper = document.getElementById('paper');
      const rock = document.getElementById('rock');
      const scissors = document.getElementById('scissors');

      const arrOfPlayerChoice = [paper, rock, scissors];
      //create an array for the computer options
      const arrOfComputerChoice = ['paper', 'rock', 'scissors'];

      arrOfPlayerChoice.forEach((element) => 
        element.addEventListener('click', function() {
            
        }))
  }
}
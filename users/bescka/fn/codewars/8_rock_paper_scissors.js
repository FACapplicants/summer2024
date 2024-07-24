 // Here the keys are created for the rules object (dict) using quoted strings
// as it is assumed the input will be a string. 
// However in javascript the keys in the object do not need to be in quotes 
// if they are valid js "identifiers": 
    // * they cannot start with a number
    // * they cannot contain spaces or special characters apart from underscore
// So technically they aren't needed here. 

const p1 = "rock"
const p2 = "paper"
// First attempt
const rps = (p1, p2) => {
    const dict = {
      "rock": "scissors",
      "scissors": "paper",
      "paper": "rock",
    }
    if (p1 == p2) {
      return "Draw!"
    } else if (p2 == dict[p1]) {
      return "Player 1 won!"
    } else if (p1 == dict[p2]) {
      return "Player 2 won!"
    }
  };

result = rps(p1, p2); 
console.log(result);

// Note on most upvoted solution - very similar!:
// It is more succinct but seems to be unrobust to input error: "bock", "scissors"
// will give "Player 2 won!"
const _rps = (p1, p2) => {
    if (p1 === p2) return "Draw!";
    var rules = {rock: "scissors", paper: "rock", scissors: "paper"};
    if (p2 === rules[p1]) {
      return "Player 1 won!";
    }
    else {
      return "Player 2 won!";
    }
  };
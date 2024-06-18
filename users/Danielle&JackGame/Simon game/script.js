var buttonColours = ['red', 'green', 'blue', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];


// 

$(".btn").click(function(){

   var userChosenColour = $(this).attr("id");

   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);

});

 


function nextSequence() {

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);

   playSound(randomChosenColour);

}

//

function playSound(name){

   var audio = new Audio("Games/Simon game/sounds/" + name +".mp3");
   audio.play();

}

// detect press

$("#start-button").click(nextSequence()

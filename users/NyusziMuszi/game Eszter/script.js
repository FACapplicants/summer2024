"use strict";

//// SELECTORS /////
// const starter = document.getElementById("starter");
const main = document.getElementById("main");
let flexy = document.getElementsByClassName("flexy");
let length = 1;
//// FUNCTIONS /////
function divide() {
  const div = document.createElement("div");
  div.classList.add("flexy");

  main.appendChild(div);
}
//// EVENT LISTENERS /////
for (let i = 0; i <= flexy.length; i++) {
  flexy[i].addEventListener("click", divide);
  length++;
  console.log(i);
}
console.log(length);

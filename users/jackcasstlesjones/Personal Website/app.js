const cardOne = document.getElementById("card-one");
const infoOne = document.getElementById("info-one");
const headerOne = document.getElementById("header-one");

const cardTwo = document.getElementById("card-two");
const infoTwo = document.getElementById("info-two");
const headerTwo = document.getElementById("header-two");

const cardThree = document.getElementById("card-three");
const infoThree = document.getElementById("info-three");
const headerThree = document.getElementById("header-three");

const cardFour = document.getElementById("card-four");
const infoFour = document.getElementById("info-four");
const headerFour = document.getElementById("header-four");

cardOne.addEventListener("click", function () {
  if (infoOne.style.opacity === "1") {
    infoOne.style.opacity = 0;
    headerOne.style.opacity = 1;
  } else {
    infoOne.style.opacity = 1;
    headerOne.style.opacity = 0;
  }
});

cardTwo.addEventListener("click", function () {
  if (infoTwo.style.opacity === "1") {
    infoTwo.style.opacity = 0;
    headerTwo.style.opacity = 1;
  } else {
    infoTwo.style.opacity = 1;
    headerTwo.style.opacity = 0;
  }
});

cardThree.addEventListener("click", function () {
  if (infoThree.style.opacity === "1") {
    infoThree.style.opacity = 0;
    headerThree.style.opacity = 1;
  } else {
    headerThree.style.opacity = 0;
    infoThree.style.opacity = 1;
  }
});

cardFour.addEventListener("click", function () {
  if (infoFour.style.opacity === "1") {
    infoFour.style.opacity = 0;
    headerFour.style.opacity = 1;
  } else {
    infoFour.style.opacity = 1;
    headerFour.style.opacity = 0;
  }
});

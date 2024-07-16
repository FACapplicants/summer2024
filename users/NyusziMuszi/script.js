"use strict";

const getRandomHslaColor = () => {
  // Define an async function that returns a random number within a range
  const getRandomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min);
  const getRandomNumberAlpha = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(1);
  // Destructure an object that contains three random numbers for hue, saturation and lightness
  const { hue, saturation, lightness, alpha } = {
    hue: getRandomNumber(0, 360),
    saturation: getRandomNumber(20, 80),
    lightness: getRandomNumber(10, 60),
    alpha: getRandomNumberAlpha(1, 1),
  };
  // Return the string with hsl prefix
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha} )`;
};
console.log(getRandomHslaColor());

function changeColor() {
  const shapes = document.getElementsByClassName("shape");
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].style.backgroundColor = getRandomHslaColor();
  }
}
function removeShape() {
  const shapes = document.getElementsByClassName("shape");
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].style.display = "none";
  }
}

window.addEventListener("load", function () {
  changeColor();
});

// addEventListener("mouseenter", (event) => {});
const work = [
  {
    id: "0",
    title: "Insula Lutherana",

    blurb:
      "Making the Lutheran Complex (situated on the main square of Budapest) visible, by initiating a dialogue with the city it serves.",
    imgURL: [],
  },
];

// {
//     title: "",
//     blurb1: "",
//     imgName1: "",
//     imgName2: "",
//     imgName3: "",
//   },

"use strict";

//// FUNCTIONS /////

//////// Generating random values /////

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const getRandomHslaColor = (hueLimit) => {
  const getRandomNumberAlpha = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(1);
  const { hue, saturation, lightness, alpha } = {
    hue: getRandomNumber(0, 250),
    saturation: getRandomNumber(25, 80),
    lightness: getRandomNumber(30, 70),
    alpha: getRandomNumberAlpha(1, 1),
  };

  console.log(hue, "hue");
  console.log(hueLimit, "huelimit");

  return `hsla(${hue + hueLimit}, ${saturation}%, ${lightness}%, ${alpha} )`;
};

const getRandomPosition = () => {
  const position = [
    `${getRandomNumber(0, 100)}px`,
    `${getRandomNumber(0, 200)}px`,
  ];
  return position;
};

const getRandomScale = () => {
  const scale = `${getRandomNumber(70, 100)}%`;
  return scale;
};

//////// Setting random values /////
function setColor(huelimit) {
  const shapes = document.getElementsByClassName("shape");
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].style.backgroundColor = getRandomHslaColor(huelimit);
  }
}

function setScale() {
  const shapes = document.getElementsByClassName("shape");
  for (let i = 0; i < shapes.length; i++) {
    const scale = getRandomScale();
    shapes[i].style.scale = scale;
  }
}

function setPosition() {
  const shapes = document.getElementsByClassName("shape");
  for (let i = 0; i < shapes.length; i++) {
    const position = getRandomPosition();
    shapes[i].style.left = position[0];
    shapes[i].style.top = position[1];
  }
}

//////// Shapes /////

function removeShape(e) {
  e.style.display = "none";
}
function animateShape(e) {
  e.classList.add("clicked");
}

function matchColor(e) {
  let colorShape = e.style.backgroundColor;

  contentSection.style.backgroundColor = colorShape
    .replace("rgb", "rgba")
    .replace(")", ", 0.5)");

  foodSection.style.backgroundColor = colorShape
    .replace("rgb", "rgba")
    .replace(")", ", 0.5)");
}

//////// Content /////

function findID(e) {
  return e.id;
}

function loadContent(shapeId) {
  let div = document.createElement("div");
  div.id = "content";
  div.innerHTML = `<h2 id="title">${work[shapeId].title}</h2>
  <p id="blurb">${work[shapeId].blurb}</p>
  <img class="projectMedia" src="${work[shapeId].imgURL[0]}" alt="" />
  `;
  contentSection.appendChild(div);
}
function removeContent() {
  let element;
  if ((element = document.getElementById("content"))) {
    element.remove();
  } else {
    console.log("not yet loaded");
  }
}
//// TARGETS /////

const contentSection = document.getElementById("contentSection");
const foodSection = document.getElementById("foodSection");

const shapes = document.getElementsByClassName("shape");
const loadButton = document.getElementById("loadBtn");

//// EVENT LISTENERS /////

for (let i = 0; i < shapes.length; i++) {
  shapes[i].addEventListener("click", function () {
    animateShape(shapes[i]);
    // removeShape(shapes[i]);
    matchColor(shapes[i]);
    findID(shapes[i]);
    removeContent();
    setTimeout(() => {
      removeShape(shapes[i]);
    }, "1000");
    loadContent(findID(shapes[i]));
  });
}

window.addEventListener("load", function () {
  setPosition();
  setColor(getRandomNumber(0, 150));
  setScale();
});

loadButton.addEventListener("click", function () {
  console.log("clicked");
  setPosition();
  setColor(getRandomNumber(0, 150));
  setScale();
});

//// DATABASE /////
const work = [
  {
    id: "0",
    title: "Insula Lutherana",

    blurb:
      "Making the Lutheran Complex (situated on the main square of Budapest) visible, by initiating a dialogue with the city it serves.",
    imgURL: [
      "img/eszter_muray_ammonite_1.png",
      "img/eszter_muray_insula_3.png",
    ],
  },
  {
    id: "1",
    title: "Something Else",

    blurb: "something else",
    blurb2: "ejlkhdfqlwehfgl else",

    imgURL: ["img/eszter_muray_insula_3.png"],
  },
  {
    id: "2",
    title: "Something Something",

    blurb: "something else",
    imgURL: ["img/eszter_muray_insula_2.png"],
  },
  {
    id: "3",
    title: "Something Else else",

    blurb: "something else",
    imgURL: ["img/eszter_muray_insula_2.png"],
  },
  {
    id: "4",
    title: " Else",

    blurb: "something else",
    imgURL: ["img/eszter_muray_insula_2.png"],
  },
  {
    id: "5",
    title: " Else Else Else  ",

    blurb: "something else",
    imgURL: ["img/DigiLens-Argo-AR-Smart-Glasses-HD.jpg"],
  },
];

// {
//     title: "",
//     blurb1: "",
//     imgName1: "",
//     imgName2: "",
//     imgName3: "",
//   }

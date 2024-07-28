"use strict";

//// SELECTORS /////

const contentSection = document.getElementById("contentSection");
const foodSection = document.getElementById("foodSection");
const table = document.getElementById("table");
const head = document.getElementById("head");
const contentContainer = document.getElementById("content");

const shapes = document.getElementsByClassName("shape");

const reloadBtn = document.getElementById("reloadBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const chefBtn = document.getElementById("chefBtn");

//// FUNCTIONS /////

//////// FUNCTION: Generating random values /////

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

function getRandomHslaColor(hueLimit) {
  const getRandomNumberAlpha = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(1);
  const { hue, saturation, lightness, alpha } = {
    hue: getRandomNumber(0, 250),
    saturation: getRandomNumber(25, 80),
    lightness: getRandomNumber(30, 70),
    alpha: getRandomNumberAlpha(1, 1),
  };
  return [hue, saturation, lightness, alpha];
}

function getRandomPosition() {
  const position = [
    `${getRandomNumber(0, 100)}px`,
    `${getRandomNumber(0, 200)}px`,
  ];
  return position;
}

function getRandomScale() {
  const scale = `${getRandomNumber(70, 100)}%`;
  return scale;
}

//////// FUNCTION: Setting random values /////
function setColor(hueLimit) {
  const shapes = document.getElementsByClassName("shape");
  for (let i = 0; i < shapes.length; i++) {
    const [hue, saturation, lightness, alpha] = getRandomHslaColor(hueLimit);
    shapes[i].style.backgroundColor = `hsla(${
      hue + hueLimit
    }, ${saturation}%, ${lightness}%, ${alpha} )`;
  }
}
function matchColor(hueLimit) {
  const [hue, saturation, lightness, alpha] = getRandomHslaColor(hueLimit);
  const colorBg = `hsla(${hue}, ${saturation - 30}%, ${
    lightness + 30
  }%, ${alpha} )`;
  const colorHead = `hsla(${hue}, ${saturation - 30}%, ${
    lightness - 30
  }%, ${alpha} )`;

  table.style.backgroundColor = colorBg;
  head.style.color = colorHead;
  // .replace("rgb", "rgba")
  // .replace(")", ", 0.1)");
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

//////// FUNCTION: Shapes /////

function removeShape(e) {
  e.style.display = "none";
}
function animateShape(e) {
  e.classList.add("clicked");
}

//////// FUNCTION: Content /////

function findID(e) {
  return e.id;
}

function loadContent(shapeId) {
  // const body = document.createElement("p");
  // const node = document.createTextNode(work[shapeId].blurb);

  // body.appendChild(node);
  // contentContainer.appendChild(body);

  // head.innerHTML = work[shapeId].title;

  // work[shapeId];
  console.log(work[shapeId].imgURL.length);
  const imageURLS = [];
  work[shapeId].imgURL.forEach((url) => {
    imageURLS.push(`<img class="projectMedia" src="${url}" alt="" />`);
  });
  console.log(imageURLS.join(" "));

  let div = document.createElement("div");
  div.id = "content";

  contentSection.innerHTML = `<h2 id="head">${work[shapeId].title}</h2>
    <p id="blurb">${work[shapeId].blurb}</p>${imageURLS.join(" ")}`;
  contentSection.appendChild(div);
}

function removeContent() {
  let element;
  if ((element = document.getElementById("content"))) {
    element.remove();
  } else {
    console.log("not yet loaded");
  }
  // head.innerHTML = "";
  // body.innerHTML = "";
}

//// EVENT LISTENERS /////

for (let i = 0; i < shapes.length; i++) {
  shapes[i].addEventListener("click", function () {
    animateShape(shapes[i]);
    // removeShape(shapes[i]);
    findID(shapes[i]);
    removeContent();
    setTimeout(() => {
      removeShape(shapes[i]);
    }, "1000");
    loadContent(findID(shapes[i]));
    matchColor(getRandomNumber(0, 150));
  });
}

window.addEventListener("load", function () {
  setPosition();
  setColor(getRandomNumber(0, 150));
  setScale();
});

reloadBtn.addEventListener("click", function () {
  location.reload();
});

shuffleBtn.addEventListener("click", function () {
  setPosition();
  setColor(getRandomNumber(0, 150));
  setScale();
});

chefBtn.addEventListener("click", function () {
  loadContent("chef");
});

//// DATABASE /////

const work = [
  {
    id: "0",
    title: "Insula Lutherana",
    meta: { date: "2015", client: "xxx" },
    blurb:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins wit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum",
    imgURL: [
      "img/eszter_muray_ammonite_1.png",
      "img/eszter_muray_insula_3.png",
      "img/eszter_muray_insula_3.png",
      "img/eszter_muray_insula_3.png",
    ],
  },
  {
    id: "1",
    title: "Something Else",

    blurb: "something else",

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
  {
    id: "chef",
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

// class Project {
//   constructor(title, meta, intro, imgs) {
//     this.values = [r, g, b];
//   }
//   get red() {
//     return this.values[0];
//   }
//   set red(value) {
//     this.values[0] = value;
//   }
// }

// const work2 = [
//   new Project(255, 0, 0),
//   new Project(255, 0, 0),
//   new Project(255, 0, 0),
// ];

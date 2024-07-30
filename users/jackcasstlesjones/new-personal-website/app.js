// navbarLinks.forEach((element) => {
//   element.addEventListener("click", function () {
//     // if (element.classList.contains("selected")) {
//     //   element.classList.remove("selected");
//     // }
//     element.classList.toggle("selected");
//     console.log(element);
//   });
// });

const navbarHome = document.getElementById("navbar-home");
const navbarAbout = document.getElementById("navbar-about");
const navbarWork = document.getElementById("navbar-work");
const navbarPhotography = document.getElementById("navbar-photography");

const navBar = document.querySelector(".navbar");
const navbarMenuIcon = document.querySelector(".mobile-menu-icon");

const navBarLinks = document.querySelectorAll(".navbar-link");

navbarMenuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show-navbar");
  navbarMenuIcon.classList.toggle("other-colour");
});

// console.log("sadfasd");

let navCounter = "home";

const updateNavBar = () => {
  navBarLinks.forEach((element) => {
    console.log(element);
    if (element.id === `navbar-${navCounter}`) {
      console.log(element.id);
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
};

updateNavBar();

navbarAbout.addEventListener("click", function () {
  changeNav("about");
});
navbarWork.addEventListener("click", function () {
  changeNav("work");
});
navbarPhotography.addEventListener("click", function () {
  changeNav("photography");
});

const changeNav = (changeChoice) => {
  navCounter = changeChoice;
  updateNavBar();
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* -------------------------------------------------------------------------- */

const unscrolledElements = document.querySelectorAll(".unscrolled");
const pastCard = document.querySelector(".past-card");
const presentCard = document.querySelector(".present-card");
const futureCard = document.querySelector(".future-card");

unscrolledElements.forEach((element) => {
  // element.style.opacity = 0;
});

const elementInView = (element, scrollOffset) => {
  const elementTop = element.getBoundingClientRect().top;
  // console.log(elementTop);
  // console.log(window.innerHeight);
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - scrollOffset
  );
};

const addClasslist = (element, chosenClass, chosenClass2) => {
  element.classList.add(chosenClass, chosenClass2);
};

const handleScrollAnimation = (targetElement, chosenClass) => {
  targetElement.forEach((element) => {
    if (elementInView(element, 300)) {
      addClasslist(element, chosenClass);
    }
  });
};

const aboutCardsAnimation = (element, chosenClass) => {
  if (elementInView(element, 300)) {
    addClasslist(element, chosenClass);
  }
  if (pastCard.classList.contains("transform-zero")) {
    setTimeout(function () {
      addClasslist(presentCard, "transform-zero", "scrolled");
    }, 700);
    setTimeout(function () {
      addClasslist(futureCard, "transform-zero", "scrolled");
    }, 1400);
  }
};

window.addEventListener("scroll", () => {
  handleScrollAnimation(unscrolledElements, "scrolled");
  aboutCardsAnimation(pastCard, "transform-zero");
});

const delayedAnimation = () => {
  if (pastCard.classList.contains("transform-zero")) {
    addClasslist(presentCard, "transform-zero");
  }
};

/* ----------------------------- CAROUSEL ---------------------------------- */

const carouselAltText = {
  landscape: {
    1: "A temple on a rocky hill at Hua Caves in Vietnam with mountains stretching into the background",
    2: "A man in a boat fishing on a lake in front of skyscrapers in Ho Chi Minh City",
    3: "A large bridge-like structure curves through the fog over lush vegetation in Thailand",
    4: "Two girls sit on a rock, looking towards the sunrise in the Australian outback",
    5: "Two people on a cliff in the distance are silhouetted against the blue sky at Kings Canyon, Australia.",
  },
  street: {
    1: "A boy kicks a ball in mid-air over a blue playing court in Bangkok.",
    2: "A group of women in colourful dresses pose for a photo in Hanoi.",
    3: "A man looks down as he does business with another man in Bangkok.",
    4: "A man in Hanoi leans against a motorcycle as he picks his teeth.",
    5: "A close up of a street vendor with a cigarette in his mouth cutting Durian in Chinatown, Bangkok.",
  },
};

let carouselContainer = document.getElementById("carousel");
const leftButton = document.querySelector(".left-arrow-container");
const rightButton = document.querySelector(".right-arrow-container");
const photographyBtns = document.querySelectorAll(".photography-btn");
const carouselDots = document.querySelectorAll(".carousel-dot");

let chosenFolder = "landscape";
let photoCounter = 1;

const updateCarousel = () => {
  carouselContainer.innerHTML = `<img src="assets/photography/${chosenFolder}/${photoCounter}.jpeg" alt="${carouselAltText[chosenFolder][photoCounter]}"/>`;

  photographyBtns.forEach((element) => {
    if (element.id === chosenFolder) {
      element.classList.add("bordered");
    } else {
      element.classList.remove("bordered");
    }
  });

  carouselDots.forEach((element) => {
    if (element.id === `dot-${photoCounter}`) {
      element.classList.add("full-dot");
    } else {
      element.classList.remove("full-dot");
    }
  });
};

updateCarousel();

photographyBtns.forEach((element) => {
  element.addEventListener("click", function () {
    chosenFolder = element.id;
    updateCarousel();
  });
});

rightButton.addEventListener("click", function () {
  if (photoCounter === 5) {
    photoCounter = 0;
  }
  photoCounter++;
  updateCarousel();
});

leftButton.addEventListener("click", function () {
  if (photoCounter === 1) {
    photoCounter = 6;
  }
  photoCounter--;
  updateCarousel();
});

/* ------------------------------------------ learning resource dialogue boxes ---------------- */

const learningCards = document.querySelectorAll(".learning-resource-card");

// console.log(learningCards);

learningCards.forEach((element) => {
  element.addEventListener("click", function () {
    const elementInfo = document.getElementById(`info-${element.id}`);
    elementInfo.classList.toggle("show");
  });
  console.log(element);
});

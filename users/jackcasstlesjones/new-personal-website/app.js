const navbarLinks = document.querySelectorAll(".navbar-link");

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

navbarMenuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show-navbar");
  navbarMenuIcon.classList.toggle("other-colour");
});

navbarHome.classList.add("selected");
// console.log("sadfasd");

const addAndRemove = function (
  elementZero,
  elementOne,
  elementTwo,
  elementThree,
  className
) {
  elementZero.classList.remove(className);
  elementOne.classList.remove(className);
  elementTwo.classList.remove(className);
  elementThree.classList.add(className);
  navBar.classList.remove("show-navbar");
  navbarMenuIcon.classList.remove("other-colour");
};

navbarHome.addEventListener("click", function () {
  addAndRemove(
    navbarAbout,
    navbarWork,
    navbarPhotography,
    navbarHome,
    "selected"
  );
});
navbarAbout.addEventListener("click", function () {
  addAndRemove(
    navbarHome,
    navbarWork,
    navbarPhotography,
    navbarAbout,
    "selected"
  );
});

navbarWork.addEventListener("click", function () {
  addAndRemove(
    navbarAbout,
    navbarHome,
    navbarPhotography,
    navbarWork,
    "selected"
  );
});

navbarPhotography.addEventListener("click", function () {
  addAndRemove(
    navbarAbout,
    navbarHome,
    navbarWork,
    navbarPhotography,
    "selected"
  );
});

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

const addSingleAnimation = (element, chosenClass, chosenClass2) => {
  if (elementInView(element, 300)) {
    addClasslist(element, chosenClass);
  }
  if (pastCard.classList.contains("transform-zero")) {
    setTimeout(function () {
      addClasslist(presentCard, "transform-zero");
    }, 700);
    setTimeout(function () {
      addClasslist(futureCard, "transform-zero", "scrolled");
    }, 1400);
  }
};

window.addEventListener("scroll", () => {
  handleScrollAnimation(unscrolledElements, "scrolled");
  addSingleAnimation(pastCard, "transform-zero");
  // addSingleAnimation(futureCard, "transform-zero");
});

const delayedAnimation = () => {
  if (pastCard.classList.contains("transform-zero")) {
    addClasslist(presentCard, "transform-zero");
  }
};

/* ADD LEFT AND RIGHT IN FOR THE ABOUT THINGIES */

/* ----------------------------- CAROUSEL ---------------------------------- */

let carouselContainer = document.getElementById("carousel");
const leftButton = document.querySelector(".left-arrow-container");
const rightButton = document.querySelector(".right-arrow-container");
const photographyBtns = document.querySelectorAll(".photography-btn");
const carouselDots = document.querySelectorAll(".carousel-dot");

let chosenFolder = "landscape";
let photoCounter = 1;

const updateCarousel = () => {
  /* ADD A SWITCH STATEMENT HERE FOR THE ALT TEXT OF EACH FOLDER AND NUMBER TO DESCRIBE THEM FOR ACCESSIBILITY */
  carouselContainer.innerHTML = `<img src="assets/photography/${chosenFolder}/${photoCounter}.jpeg" alt=""/>`;
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

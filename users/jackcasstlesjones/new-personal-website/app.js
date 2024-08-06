const navbarHome = document.getElementById("navbar-home");
const navbarAbout = document.getElementById("navbar-about");
const navbarProjects = document.getElementById("navbar-projects");
const navbarPhotography = document.getElementById("navbar-photography");

const navBar = document.querySelector(".navbar");
const navbarMenuIcon = document.querySelector(".mobile-menu-icon");

const navBarLinks = document.querySelectorAll(".navbar-link");

navbarMenuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show-navbar");
  navbarMenuIcon.classList.toggle("other-colour");
});

let navCounter = "home";

// Updates the appearance of the navbar by checking what value of the navCounter against each varBarLink element and
// adds the "selected" (blue underline) class if the navCounter is equal to the element ID. Removes it if not.
const updateNavBar = () => {
  navBarLinks.forEach((element) => {
    if (element.id === `navbar-${navCounter}`) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
};

updateNavBar();

navbarHome.addEventListener("click", function () {
  changeNav("home");
});
navbarAbout.addEventListener("click", function () {
  changeNav("about");
});
navbarProjects.addEventListener("click", function () {
  changeNav("projects");
});
navbarPhotography.addEventListener("click", function () {
  changeNav("photography");
});

// Changes the value of navCounter to the changeChoice argument and updates the navBar
const changeNav = (changeChoice) => {
  navCounter = changeChoice;
  updateNavBar();
  navBar.classList.remove("show-navbar");
  navbarMenuIcon.classList.toggle("other-colour");
};

// Changes the scrolling behaviour of the anchor links to 'smooth'
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* -------------------------------------------------------------------------- */

const unscrolledElements = document.querySelectorAll(".unscrolled");
const pastCard = document.querySelector(".past-card");
const presentCard = document.querySelector(".present-card");
const futureCard = document.querySelector(".future-card");

// Function to check if an element is in view within the current viewport
const elementInView = (element, scrollOffset) => {
  const elementTop = element.getBoundingClientRect().top;
  // Return true if the element is within the viewport after applying the scroll offset
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - scrollOffset
  );
};

// Utility function for adding one or two classes to an element
const addClasslist = (element, chosenClass, chosenClass2) => {
  element.classList.add(chosenClass, chosenClass2);
};

// Function to handle the scroll animation by adding a class to elements when they are in view
const handleScrollAnimation = (targetElement, chosenClass) => {
  // Iterate through each target element
  targetElement.forEach((element) => {
    // Check if the element is in view with a scroll offset of 300 pixels
    if (elementInView(element, 300)) {
      // Add the chosen class to the element if it is in view
      addClasslist(element, chosenClass);
    }
  });
};

// const aboutCardsAnimation = (element, chosenClass) => {
//   if (elementInView(element, 300)) {
//     addClasslist(element, chosenClass);
//   }
//   if (pastCard.classList.contains("transform-zero")) {
//     setTimeout(function () {
//       addClasslist(presentCard, "transform-zero", "scrolled");
//     }, 700);
//     setTimeout(function () {
//       addClasslist(futureCard, "transform-zero", "scrolled");
//     }, 1400);
//   }
// };

// Handles the transform animation for the about cards
const aboutCardsAnimation = () => {
  // If the pastCard is in view, add the transfom zero class
  if (elementInView(pastCard, 300)) {
    addClasslist(pastCard, "transform-zero");
  }
  // If pastCard has transform-zero class, wait 700 ms then add "transform zero" to presentCard
  if (pastCard.classList.contains("transform-zero")) {
    setTimeout(function () {
      addClasslist(presentCard, "transform-zero", "scrolled");
    }, 700);
    // If pastCard has transform-zero class, wait 1400 ms then add "transform zero" to futureCard
    setTimeout(function () {
      addClasslist(futureCard, "transform-zero", "scrolled");
    }, 1400);
  }
};

// Everytime user scrolls, tries to trigger handleScrollAnimation() or aboutCardsAnimation()
// Due to elementInView(), these functions are only called
// when the elements are actually on screen
window.addEventListener("scroll", () => {
  handleScrollAnimation(unscrolledElements, "scrolled");
  aboutCardsAnimation();
});

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

let chosenLearningCard = "";

learningCards.forEach((element) => {
  element.addEventListener("click", function () {
    if (chosenLearningCard !== element.id) {
      chosenLearningCard = element.id;
      updateLearningCards();
    } else {
      chosenLearningCard = "";
      updateLearningCards();
    }
  });
});

const updateLearningCards = () => {
  learningCards.forEach((element) => {
    const elementInfo = document.getElementById(`info-${element.id}`);
    const elementPlusIcon = document.getElementById(`${element.id}-plus-icon`);
    const elementMinusIcon = document.getElementById(
      `${element.id}-minus-icon`
    );

    if (chosenLearningCard === element.id) {
      elementInfo.classList.add("show");
      elementPlusIcon.classList.add("hidden-icon");
      elementMinusIcon.classList.remove("hidden-icon");
    } else {
      elementInfo.classList.remove("show");
      elementPlusIcon.classList.remove("hidden-icon");
      elementMinusIcon.classList.add("hidden-icon");
    }
  });
};

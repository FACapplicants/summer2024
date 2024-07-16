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

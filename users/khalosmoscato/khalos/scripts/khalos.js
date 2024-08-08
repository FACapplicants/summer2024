const darkButton = document.getElementById("dark-mode");

const superHeroImg = document.getElementById("sh-day");

darkButton.addEventListener("click", () => {
document.body.classList.add("dark-mode");
superHeroImg.src = "images/sh-night.png"
});

const lightButton = document.getElementById("light-mode");

lightButton.addEventListener("click", () => {
  document.body.classList.remove("dark-mode");
  superHeroImg.src = "images/sh-day.png";
})
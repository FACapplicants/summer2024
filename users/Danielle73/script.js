function setThemeImages(isDarkMode) {
    const changeHeadImage = document.getElementById('introImage');
    const originalSrc = "images/bermuda-113.png";
    const newSrc = "images/bermuda-come-back-later-1.png";

    if (isDarkMode) {
        changeHeadImage.src = newSrc;
    } else {
        changeHeadImage.src = originalSrc;
    }

    const aboutCard = document.querySelector('.bg-img');
    const originalBg = 'url("images/bermuda-22.png")';
    const newBg = 'url("images/bermuda-114.png")';

    if (isDarkMode) {
        aboutCard.style.backgroundImage = newBg;
    } else {
        aboutCard.style.backgroundImage = originalBg;
    }

    const aboutMeImg = document.querySelector('.about-me-img');
    const originalAboutMeBg = 'url("images/flamenco-153.png")';
    const newAboutMeBg = 'url("images/flamenco-137.png")';

    if (isDarkMode) {
        aboutMeImg.style.backgroundImage = newAboutMeBg;
    } else {
        aboutMeImg.style.backgroundImage = originalAboutMeBg;
    }

    const githubIcon = document.getElementById("gitIcon");
    const originalgithubIcon = "https://img.icons8.com/material-outlined/36/000000/github.png";
    const newgithubIcon = "https://img.icons8.com/?size=40&id=44900&format=png&color=FFFFFF";

    if (isDarkMode) {
        githubIcon.src = newgithubIcon;
    } else {
        githubIcon.src = originalgithubIcon;
    }

    const linkedInIcon = document.getElementById("linkedInIcon");
    const originallinkedInIcon = "https://img.icons8.com/ios-glyphs/36/000000/linkedin.png";
    const newLinkedInIcon = "https://img.icons8.com/?size=40&id=8808&format=png&color=FFFFFF";

    if (isDarkMode) {
        linkedInIcon.src = newLinkedInIcon;
    } else {
        linkedInIcon.src = originallinkedInIcon;
    }

    const CodeWarsIcon = document.getElementById("CodeWarsIcon");
    const originalCodeWarsIcon = "https://img.icons8.com/?size=36&id=PlozTIZdV8xJ&format=png&color=000000";
    const newCodeWarsIcon = "https://img.icons8.com/?size=40&id=PlozTIZdV8xJ&format=png&color=FFFFFF";

    if (isDarkMode) {
        CodeWarsIcon.src = newCodeWarsIcon;
    } else {
        CodeWarsIcon.src = originalCodeWarsIcon;
    }
}

function lightsOff() {
    const darkMode = document.body;
    const isDarkMode = darkMode.classList.toggle("dark-theme");

    const nav = document.querySelector('.navigation');
    nav.classList.toggle('dark-theme');

    setThemeImages(isDarkMode);
}

// Calls the setThemeImages function to set the initial theme & check 
// This should fix the light theme image issue. 

document.addEventListener("DOMContentLoaded", function() {
    const isDarkMode = document.body.classList.contains("dark-theme");
    setThemeImages(isDarkMode);
});

/* Sticky / Fixed vertical navbar for responsive screens */
window.onscroll = () => {
    topScroll();
}

const navbar = document.querySelector(".navigation");

// NOTE: pageYOffset is depreciated, so use scrollY instead. To account for 
// older browsers. A conditional will ensure compatibility across browsers

function topScroll() {
    if (window.pageYOffset || window.scrollY >= navbar.offsetTop) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

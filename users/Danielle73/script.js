function lightsOff() {
    
    const darkMode = document.body;
    const isDarkMode = darkMode.classList.toggle("dark-theme");

    const nav = document.querySelector('.navigation');
    nav.classList.toggle('dark-theme');

    /* JS for image change */
    const changeHeadImage = document.getElementById('myImage');
    const originalSrc = "/images/bermuda-113.png";
    const newSrc = "/images/bermuda-come-back-later-1.png";

    if (isDarkMode) {
        changeHeadImage.src = newSrc;
    } else {
        changeHeadImage.src = originalSrc;
    }

    // Image change for bg image of text element
    const aboutCard = document.querySelector('.bg-img');
    const originalBg = 'url("/images/bermuda-22.png")';
    const newBg = 'url("/images/bermuda-114.png")';

    if (isDarkMode) {
        aboutCard.style.backgroundImage = newBg;
    } else {
        aboutCard.style.backgroundImage = originalBg;
    }

    // image change for bg image for profile picture
    const aboutMeImg = document.querySelector('.about-me-img');
    const originalAboutMeBg = 'url("/images/flamenco-153.png")';
    const newAboutMeBg = 'url("/images/flamenco-137.png")';

    if (isDarkMode) {
        aboutMeImg.style.backgroundImage = newAboutMeBg;
    } else {
        aboutMeImg.style.backgroundImage = originalAboutMeBg;     
    }

}


/* Sticky navbar for responsive screens */
window.onscroll = () => {
    topScroll();
}

const navbar = document.querySelector(".navigation");

// pageYOffset is depreciated, so use scrollY instead. To account for 
// older browsers. A conditional will ensure compatibility across browsers old and new

function topScroll() {
    if (window.pageYOffset || window.scrollY >= navbar.offsetTop) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}


# Jack Casstles-Jones Portfolio

Welcome to my portfolio website. I have created a responsive site with a mobile UI that features smooth animations. This is all my own work.

## Resources

- **Colour Palette**: [Coolors](https://coolors.co/)
- **Fonts**: [Cormorant](https://fonts.google.com/specimen/Cormorant) & [Roboto](https://fonts.google.com/specimen/Roboto)
- **Icons**: [Feather Icons](https://feathericons.com/) & [Font Awesome](https://fontawesome.com/)
- **Hero Squiggles**: [Blush](https://blush.design/)

## Key Features

1. **Animations**

   - Animations as the user scrolls down the pages display the content in an engaging manner.

2. **Design Choices**

   - A playful yet minimalist design, utilising a colour scheme from Coolors, icons from various sources, and SVGs from Blush.

3. **Projects**

   - Showcases a selection of my projects, demonstrating my skills in front-end development.

4. **Responsiveness**

   - Utilises media queries to resize elements according to the window size. When the window is small enough, the navigation bar is replaced with a mobile menu.

5. **Carousel**
   - Displays a carousel of my photography work, including landscape and street photography. The carousel also automatically updates the alt text of the shown image.

## Projects

- **[OlympiaTree](https://olympiatree.netlify.app/)**

  - Made using React, this project involved translating [this](https://qph.cf2.quoracdn.net/main-qimg-2bd602d9041eff7f417ea6dd81fbaf42) family tree, found on Quora, into [this](https://imgur.com/a/hNC6BUC) grid layout using Figma. Following this, I hand-coded the grid into React, using components to style the lines and give each God their own information card. I also designed the information cards in Figma, hard-coded the description for each God, adapted from copy on [Theoi](https://www.theoi.com/). This project also utilised UUIDs for each God. These are generated at the start of every session, which is what enables the God Info Cards to be displayed.

- **[Random Fact Generator](https://jackcasstlesjones.github.io/random-facts/)**

  - I love a good bit of trivia. This simple fact-generator was inspired by [altl.io](https://www.altl.io/) and utilises the [Facts API](https://api-ninjas.com/api/facts) from API Ninjas. I wanted it to be responsive and aesthetically pleasing, and many of the design choices used in my portfolio were first explored here. I made this after my first foray into APIs and asynchronous coding.

- **[Humble or Noble](https://jackcasstlesjones.github.io/humble-or-noble/)**

  - This project originated from a game I played with friends, where we decide/debate whether a certain food is 'humble' or 'noble'. This very simple project has a hard-coded object containing 738 foods. I then used splice() to both remove a food from the object, ensuring zero repeats in a session, and return a string to display the food and make a call to the [Unsplash](https://unsplash.com/) API. Depending on the food, this can result in an accurate picture being displayed, but often something unrelated will come back. If there is nothing returned, another call to the API will be made and that food will be skipped. To qualify for the Unplash API's production rate, I had to ensure that all artists were credited accordingly on the website, and apply using the Unplash processes.

## JavaScript Functionality

### Navigation and Smooth Scrolling

- **Navigation Bar Interaction**

  - **Functionality**: Toggles the visibility of the navigation bar on mobile and updates the "selected" class for active navigation links.
  - **Code**: Listens for clicks on navigation items and updates the active state based on `navCounter`.

- **Smooth Scrolling**
  - **Functionality**: Smoothly scrolls to sections when navigation links are clicked.
  - **Code**: Uses `scrollIntoView` with smooth behaviour for anchor links.

### Scroll Animation

- **Element Visibility Check**

  - **Functionality**: Adds animation classes to elements when they come into view during scrolling.
  - **Code**: Uses `elementInView` to determine if an element should have the "scrolled" class applied.

- **About Cards Animation**
  - **Functionality**: Applies transformation classes to cards based on their scroll position, creating a sequential animation effect.
  - **Code**: Adds "transform-zero" and "scrolled" classes to cards with timed delays.

### Photography Carousel

- **Carousel Functionality**
  - **Functionality**: Allows navigation through photos and updates the displayed image and active dots based on user interaction.
  - **Code**: Updates the carousel image and navigation dots based on button clicks and selected folder.
    > **Note:** The carousel dynamically updates the alt text of the images, sourced from an object in `app.js`.

### Learning Resource Dialogue Boxes

- **Card Interaction**
  - **Functionality**: Toggles information visibility for learning resource cards on click, showing and hiding additional details.
  - **Code**: Manages the display of detailed information and plus/minus icons based on the selected card.

## Contact

For more information or to get in touch, visit my [GitHub profile](https://github.com/JackCasstlesJones).

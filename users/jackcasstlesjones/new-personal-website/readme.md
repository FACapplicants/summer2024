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

  - Made using React, this project involved translating [this](https://qph.cf2.quoracdn.net/main-qimg-2bd602d9041eff7f417ea6dd81fbaf42) family tree, found on Quora, into [this](https://imgur.com/a/hNC6BUC) grid layout using Figma. I hand-coded the grid into React, using components to style the lines and give each God their own information card. The information cards were designed in Figma and the descriptions adapted from [Theoi](https://www.theoi.com/). UUIDs are used for each God to dynamically generate and display the God Info Cards.

- **[Random Fact Generator](https://jackcasstlesjones.github.io/random-facts/)**

  - Inspired by [altl.io](https://www.altl.io/), this simple fact-generator uses the [Facts API](https://api-ninjas.com/api/facts) from API Ninjas. Designed to be responsive and visually appealing, it served as a learning project for APIs and asynchronous coding.

- **[Humble or Noble](https://jackcasstlesjones.github.io/humble-or-noble/)**
  - A project based on a game where foods are categorised as 'humble' or 'noble'. It uses a hard-coded object with 738 foods and the [Unsplash](https://unsplash.com/) API to fetch and display images. Includes logic to handle image retrieval and API rate limits.

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

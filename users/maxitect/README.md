# maxitect's Read Me
I'm Max and this is my web project created as part of the FAC application. This website can adapt dynamically using CSS Flexbox. The game I have here was created based on an mdn web docs tutorial, linked below, but I have also tried to make it adapt dynamically to the users screen size.

## Credits

### Typeface
For both project I am using the a typeface created by Collletttivo called Necto Mono, webfont can be downloaded from their website at this address: https://www.collletttivo.it/typefaces/necto-mono

> [!NOTE]
> This Font Software is licensed under the SIL Open Font License, more information about this type of license found here: https://scripts.sil.org/OFL

### Music
The game uses an AI-generated soundtrack called Funky Grooves Underground by Stocktune which can be found here: https://stocktune.com/free-music/funky-grooves-underground-83611-65824

> [!NOTE]
> This soundtrack is in the public domain, free to download, use and modify anywhere.


## Website: Max's Flexy Flex Webbox

### Flexbox
The main feature of this website that I wanted to explore was using CSS flexbox to organise my website content dynamically, which can adjust to the screen the user is viewing the website from.

In order to achieve this, I followed the documentation from W3 school found here: https://www.w3schools.com/css/css3_flexbox.asp

Some properties that I found helpful:
- justify-content: This CSS property aligns items horizontally.
- align-items: This CSS property aligns items vertically.

These properties accept the following values:
- flex-start: Items align to the left side of the container.
- flex-end: Items align to the right side of the container.
- center: Items align at the center of the container.
- space-between: Items display with equal spacing between them.
- space-around: Items display with equal spacing around them.

> [!TIP]
> A fun resource to learn more about flexbox is Flexbox Froggy, found here: https://flexboxfroggy.com/

### SVGs
During this project I learned how to use SVGs to insert vector images/icons into your webpage using text only. 

The advantage of this is that you can make your icons in illustrator, export as SVGs and then open with the text editor and insert it into your html as an <svg> element without needing to have seperate image files in your github repo. As it is a vector graphic it is much crisper than a PNG. Keeping it in this format means that you can control things like colour, size, stroke etc directly from your css styles file and you can even animate these when a user hovers using css transition.

I used this for my external link logos so that when the user hovers over one to click, it can change colour just like links. But I also used it to animate the logo of my webpage, using transitions.

> [!CAUTION]
> SVGs written directly into HTML can present an accessibility issue that impacts users of assistive technology (AT). In order for your website to be accessible to all, all graphics need a description tag attribute to replace it if it is too distracting or not easily understood. To enable this, you need to add an additional <title> and/or <text> element nested inside the <svg> element.


## Game: BL0CKBUSTER

### Initial game concept
This game was created following most of this tutorial: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it
Based on the above, a lot has been modified and stylised to fit my preferences and so the game is unique.

### Canvas API
The game is based on HTML's canvas element which uses an API to pass the canvas HTML element information to javascript methods. It is the Canvas API, I used MDN Web Docs to understand further to develop the game, found here: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

### Dynamic user experience
In order to enhance the user experience across all screen sizes, the game can be resized to any size and this will lead to a varying number of blocks to be busted. This means there are almost infinite possible game configurations if you keep resizing your window, or play on different devices at different resolutions. To make this possible I used Javascript to detect the user's window size and applied those dynamically across variable and functions that make the game work.

### JS setInterval
the setInterval Javascript method is used to animate interactive content on screen. It lets you repeat your functions at a specified interval, more information found here: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
Used in combination with the Canvas API, this forms the basis of how the game functions.

> [!TIP]
> I had an issue with running 2 setInterval methods sequentially in order to achieve a countdown animation before the game begins. Although Javascript is synchronous, meaning the code runs sequentially as it is written (if one functions is written to run before another, it will), it only means that the first call of the function specified in the setInterval method will run sequentially but after that the intervals are running in parallel. Because of this, the countdown was running at the same time as the game had started. In order to fix this, I used a setTimeout method which delays the setInterval method for the game to begin until after the countdown animation has finished.

> [!CAUTION]
> Although it is working, I am receiving errors in the console when running on Firefox about using the clearInterval method (to end the setInterval method) in a different function to the one that the setInterval is initiated in. 

### Buttons
Buttons have been stylised and animated using a how-to from W3 school, found here: https://www.w3schools.com/howto/howto_css_animate_buttons.asp
# SIMON Game

The SIMON game was a collaborative project between Danielle and Jack. The aim of the SIMON game is to memorise and submit the correct colour pattern that SIMON flashes on the screen. The colour pattern increases by one colour each level unless the player submits an incorrect colour, in which case the game will restart at level one.

**Intro:** 

Not to be mistaken for Simon Says, the main goal of SIMON is to challenge and improve short-term memory. Gameplay for SIMON is as follows:


![Screenshot of SIMON start screen](https://raw.githubusercontent.com/FACapplicants/summer2024/main/users/Danielle%26JackGame/Simon%20game%20Vanilla/assets/SimonGame.png)


- SIMON flashes a colour and plays a corresponding tone for the player.
- The player must submit that colour correctly to proceed to the next level.
- SIMON increases the colour sequence by one each level.
- The higher the level, the longer the sequence of colours shown by SIMON.
- As long as the player submits the correct pattern, SIMON will continue to increase the colour pattern by one.
- All patterns generated by SIMON are random, ensuring no two games are the same.
- If the player fails to submit the correct pattern, SIMON will end the game, and the player will restart at level one.

Using SIMON's gameplay, we translated the logic into vanilla JavaScript. We established a basic blueprint for SIMON that met the logic targets of the game, and then brainstormed further enhancements for gameplay.

**Our Enhancements:**

For the look and theme of SIMON, we based the idea of the game around a ‘dystopian’ overlord. Using CSS and Javascript, we added the following:

- An industrial background to our modal and gameboard.
- On each button flash, we added an image of two robots, but only when SIMON plays, this is not replicated when the player repeats the sequence.
- Each button has a distressed background.
- Our H1 element representing the SIMON game title, used keyframes for a flickering neon effect.

For user enjoyment, we established four levels of difficulty for SIMON:

- Easy
- Normal
- Hard
- Impossible

![Screenshot of SIMON start screen](https://raw.githubusercontent.com/FACapplicants/summer2024/main/users/Danielle%26JackGame/Simon%20game%20Vanilla/assets/SimonLevels.png)


Users can select from the four options to either increase or decrease game speed. By default, it is set to Normal.

**Conclusion:**

Throughout the development of SIMON, we encountered and rectified several pain points. Early on, we discovered a bug that allowed users to restart the game at any level and have SIMON replay the last sequence of colours instead of resetting player metrics. We resolved this by adjusting the game logic to properly acknowledge our reset function when the player lost.
Depending on the skill level selected, the tones played for each button did not sync correctly with the speed increase. We addressed this by using the oscillatorNode to better control the response time.

**Future of SIMON:**

Looking ahead, we brainstormed ideas to enhance SIMON further. Potential improvements include implementing a High Score record and introducing an inverse colour theme. However, we concluded that these additions would have minimal impact on gameplay and would not significantly enhance the overall experience.

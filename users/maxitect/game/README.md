# Game Documentation

This documentation provides a detailed overview of the game mechanics, variables, event listeners, and functions used to create a paddle and ball game where the objective is to bust bricks. The game includes multiple levels and a countdown timer.

## Variables

### General Graphics Variables
These variables set up the game. Some are reinitialized in the `initVar` function every time a new game or level begins, as marked in comments.
- `const canvas = document.getElementById("myCanvas");` - Canvas element for the game.
- `const ctx = canvas.getContext("2d");` - 2D drawing context for the canvas.
- `const gameTitle = document.getElementById("game-title");` - Title element.
- `const startText = document.getElementById("start");` - Start button element.
- `const eventTitle = document.getElementById("event-title");` - Event title element.
- `const description = document.getElementById("description1");` - Description element.
- `let screenWidth = window.innerWidth;` - Screen width, reinitialized.
- `let screenHeight = window.innerHeight;` - Screen height, reinitialized.
- `let timeToStart = 3;` - Countdown timer, reinitialized.
- `let won = false;` - Win state, reinitialized.
- `let level = 0;` - Current game level.
- `let mute = false;` - Mute state.
- `const elementsMain = ["game-title", "runButton", "event-title", "description1"];` - Main elements.
- `const elementsCon = ["icons", "description2", "kb1", "kb2"];` - Additional elements.

### Paddle Variables
- `const paddleHeight = 12;` - Paddle height.
- `const paddleWidth = 120;` - Paddle width.
- `let paddleX = 0;` - Paddle X position, reinitialized.
- `let rightPressed = false;` - Right key pressed state, reinitialized.
- `let leftPressed = false;` - Left key pressed state, reinitialized.
- `let paddleDeflection = 0;` - Paddle deflection, reinitialized.

### Ball Variables
- `const ballRadius = 15;` - Ball radius.
- `let x = 0;` - Ball X position, reinitialized.
- `let y = 0;` - Ball Y position, reinitialized.
- `let dx = 0;` - Ball X direction, reinitialized.
- `let dy = 0;` - Ball Y direction, reinitialized.

### Brick Variables
- `let brickRowCount = 0;` - Number of brick rows, reinitialized.
- `let brickColumnCount = 0;` - Number of brick columns, reinitialized.
- `let brickPadding = 0;` - Padding between bricks, reinitialized.
- `let brickWidth = 0;` - Brick width, reinitialized.
- `let brickHeight = 0;` - Brick height, reinitialized.
- `let brickOffsetTop = 0;` - Top offset for bricks, reinitialized.
- `let brickOffsetLeft = 0;` - Left offset for bricks, reinitialized.
- `const bricks = [];` - Array of bricks, reinitialized.

### Score
- `let score = 0;` - Player's score, reinitialized.

## Event Listeners
These event listeners provide the controls for the game - left/right keys and mouse.

### Start Game Button
```javascript
document.getElementById("runButton").addEventListener("click", function () {
    startGame();
});
```

### Keyboard Controls
#### Key Down
```javascript
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
});
```

#### Key Up
```javascript
document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
});
```

### Mouse Control
```javascript
document.addEventListener("mousemove", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
});
```

### Touchscreen Control
```javascript
document.addEventListener('touchstart', handleTouchEvent, true);
document.addEventListener('touchmove', handleTouchEvent, true);
document.addEventListener('touchend', handleTouchEvent, true);
document.addEventListener('touchcancel', handleTouchEvent, true);
function handleTouchEvent(e) {
    if (e.touches.length === 0 ) return;
    e.preventDefault();
    e.stopPropagation();
    var touch = e.touches[0];
    if (touch.pageX > 0 && touch.pageX < canvas.width) {
        paddleX = touch.pageX - paddleWidth / 2;
    }
}
```

### Sound Control
```javascript
document.getElementById("sound").addEventListener("click", () => {
    mute = !mute;
    document.getElementById("sound1").style.display = mute ? "none" : "initial";
    document.getElementById("sound2").style.display = mute ? "none" : "initial";
    const music = document.getElementById("music");
    music.muted = mute;
});
```

## Functions
These functions determine the animation and mechanics of gameplay.

### Initialize Variables
Reinitializes all variables before a new game or level.
```javascript
function initVar() {
    // General graphics variables
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    timeToStart = 3;
    won = false;

    // Paddle variables
    paddleX = (screenWidth - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    paddleDeflection = 0;

    // Ball variables
    x = screenWidth / 2;
    y = screenHeight - ballRadius - paddleHeight - 1;
    if (screenWidth > screenHeight) {
        dx = Math.round(screenWidth / 300);
    } else {
        dx = Math.round(screenHeight / 300);
    }
    dy = -dx;

    // Score
    score = 0;

    // Brick variables
    brickRowCount = 3 + level;
    brickColumnCount = Math.round(screenWidth / 200);
    brickPadding = screenHeight / 50;
    brickWidth = (screenWidth - (brickPadding * (brickColumnCount + 3))) / brickColumnCount;
    brickHeight = screenHeight / 30;
    brickOffsetTop = brickPadding * 2;
    brickOffsetLeft = brickPadding * 2;
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}
```

### Collision Detection
Detects when the ball hits a brick and removes it from the game.
```javascript
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        won = true;
                    }
                }
            }
        }
    }
}
```

### Draw Text
Draws full-screen text size on the canvas, used for countdown and score.
```javascript
function drawText(text) {
    ctx.font = `${screenHeight}px Necto Mono`;
    ctx.fillStyle = "#0095DD";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}
```

### Draw Timer
Countdown to start the game using `drawText` function above to draw the countdown at intervals.
```javascript
function drawTimer() {
    drawCanvas();
    drawText(timeToStart);
    timeToStart--;
}
```

### Draw Ball
Draws the ball on the canvas at every interval.
```javascript
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
```

### Draw Paddle
Draws the paddle on the canvas at every interval.
```javascript
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
```

### Draw Bricks
Draws bricks based on the number of rows and columns, updated every interval with busted bricks omitted.
```javascript
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
               

 ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
```

### Draw Canvas
Draws and redraws the canvas at each interval, used in `startGame` and `drawTimer`.
```javascript
function drawCanvas() {
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
```

### Start Game
All functions, intervals, and game mechanics are called here.
```javascript
function startGame() {
    initVar();
    drawCanvas();
    elementsMain.forEach(id => document.getElementById(id).style.display = "none");
    canvas.style.display = "initial";
    const timer = setInterval(drawTimer, 1000);
    setTimeout(function game() {
        clearInterval(timer);
        const interval = setInterval(function() {
            drawCanvas();
            drawPaddle();
            drawText(score);
            drawBall();
            drawBricks();
            collisionDetection();
            if (won) {
                level++;
                elementsMain.forEach(id => document.getElementById(id).style.display = "block");
                canvas.style.display = "none";
                if (level >= 9) {
                    gameTitle.innerHTML = "SUPERBL0CK";
                    startText.innerHTML = "start over";
                    eventTitle.innerHTML = "all " + `${level+1}` + " completed";
                    description.innerHTML = "congratulations! it looks like the paddle & ball duo cleared all the blocks in the universe thanks to you! you busted up all " + `${score}` + " blocks in the final level!";
                    level = 0;
                } else {
                    gameTitle.innerHTML = "BUSTEDBL0CK";
                    startText.innerHTML = "continue";
                    eventTitle.innerHTML = "next level: " + `${level+1}`;
                    description.innerHTML = "congratulations! it looks like the paddle & ball duo cleared all the blocks thanks to you! you busted up all " + `${score}` + " blocks!";
                }
                clearInterval(interval);
            }
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                paddleDeflection = -paddleDeflection;
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if ((y + dy > canvas.height - ballRadius - paddleHeight) && (x > paddleX && x < paddleX + paddleWidth)) {
                dy = -dy;
                paddleDeflection = (x - paddleX - paddleWidth/2) / (paddleWidth/4);
            } else if (y + dy > canvas.height - ballRadius) {
                canvas.style.display = "none";
                gameTitle.innerHTML = "BL0CKBUSTED";
                startText.innerHTML = "bounce back!";
                eventTitle.innerHTML = "levels completed: " + `${level}`;
                description.innerHTML = "looks like the blocks have prevailed against the paddle & ball duo this time... you managed to bust " + `${score}` + "/" + `${brickRowCount * brickColumnCount}` + " blocks before going down";
                elementsMain.forEach(id => document.getElementById(id).style.display = "block");
                level = 0;
                clearInterval(interval);
            }
            x += dx + paddleDeflection;
            y += dy;
            if (rightPressed) {
                paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
            } else if (leftPressed) {
                paddleX = Math.max(paddleX - 7, 0);
            }
        }, 10);
    }, 4000);
}
```

This documentation provides a comprehensive overview of the game's mechanics, event listeners, and functions. It serves as a reference for understanding the game's code and for further development or modification.
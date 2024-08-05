/*Variables
These variables set up the game, some are reinitialised in the initVar function every time
a new game or level begins, these are marked in comments, if the value needs to be changed
it should be done within the function and not here.*/

//general graphics variable
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const gameTitle = document.getElementById("game-title");
const startText = document.getElementById("start");
const eventTitle = document.getElementById("event-title");
const description = document.getElementById("description1");
let screenWidth  = window.innerWidth; //reinitialised variable
let screenHeight = window.innerHeight; //reinitialised variable
let timeToStart = 3; //reinitialised variable
let won = false; //reinitialised variable
let level = 0;
let mute = false;
const elementsMain = ["game-title", "runButton", "event-title", "description1"];
const elementsCon = ["icons", "description2", "kb1", "kb2"];
const elements = elementsMain.concat(elementsCon);

//paddle variables
const paddleHeight = 12;
const paddleWidth = 120;
let paddleX = 0; //reinitialised variable
let rightPressed = false; //reinitialised variable
let leftPressed = false; //reinitialised variable
let paddleDeflection = 0; //reinitialised variable

//moving ball variables
const ballRadius = 15;
let x = 0; //reinitialised variable
let y = 0; //reinitialised variable
let dx = 0; //reinitialised variable
let dy = 0; //reinitialised variable

//brick variables
let brickRowCount = 0; //reinitialised variable
let brickColumnCount = 0; //reinitialised variable
let brickPadding = 0; //reinitialised variable
let brickWidth = 0; //reinitialised variable
let brickHeight = 0; //reinitialised variable
let brickOffsetTop = 0; //reinitialised variable
let brickOffsetLeft = 0; //reinitialised variable
const bricks = []; //reinitialised variable

//score
let score = 0; //reinitialised variable

/*Event Listeners
These event listeners provide the controls for the game - left/right keys and mouse.*/

//listen for start game button being pressed to startGame()
document.getElementById("runButton").addEventListener("click", function () {
    startGame();
    });

//listen for left or right key being pressed - paddle moved inside startGame()
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
});

//listen for left or right key is not pressed
document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
});

//move paddle based on mouse position
document.addEventListener("mousemove", (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
});

//move paddle based on touchscreen position
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

//sound control
document.getElementById("sound").addEventListener("click", () => {
    mute = !mute; //update mute boolean variable
    //display or hide mute/unmute svg on screen:
    document.getElementById("sound1").style.display = mute ? "none" : "initial";
    document.getElementById("sound2").style.display = mute ? "none" : "initial";
    const music = document.getElementById("music"); //music html element
    music.muted = mute; //mute or unmute html music element above
});

/*Functions
These functions determine the animation and mechanics of gameplay.*/

//reinitialises all variables before a new game or level
function initVar() {
    //general graphics variable
    screenWidth  = window.innerWidth;
    screenHeight = window.innerHeight;
    timeToStart = 3;
    won = false;

    //paddle variables
    paddleX = (screenWidth - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    paddleDeflection = 0;

    //moving ball variables
    x = screenWidth / 2;
    y = screenHeight - ballRadius - paddleHeight - 1;
    if (screenWidth > screenHeight) {
        dx = Math.round(screenWidth / 300);
    } else {
        dx = Math.round(screenHeight / 300);
    }
    dy = -dx;

    //score
    score = 0;

    //brick variables
    brickRowCount = 3 + level;
    brickColumnCount = Math.round(screenWidth / 200);
    brickPadding = screenHeight / 50;
    brickWidth = (screenWidth - (brickPadding * (brickColumnCount + 3))) / brickColumnCount;
    brickHeight = screenHeight / 30;
    brickOffsetTop = brickPadding * 2;
    brickOffsetLeft = brickPadding * 2;
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < (brickRowCount); r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

//detects when the ball hits a brick and removes it from the game
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                //check coordinate intersection between ball and bricks
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy; //ball direction bounces off brick in y direction
                    b.status = 0; //removes busted brick from the game
                    score ++; //score 1 point for every brick busted
                    if (score === brickRowCount * brickColumnCount) {
                        //win declared after last brick is busted - win scenario is in startGame()
                        won = true;
                    }
                }
            }
        }
    }
}

//draw full screen text size on canvas - used for countdown and score
function drawText(text) {
    ctx.font = `${screenHeight}px Necto Mono`; //text size to match screen height and font
    ctx.fillStyle = "#0095DD"; //light blue colour
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2); //text positioned centred on screen
}

//countdown to start game using drawText function above to draw countdown at interval
function drawTimer() {
    drawCanvas(); //resets the canvas between numbers counted down from to avoid overlaps
    drawText(timeToStart); //draws number full screen using function above
    timeToStart--; //decrease count by 1
}

//draw ball on canvas x and y at every interval
function drawBall() {
    ctx.beginPath();
    //draw circle at current ball coordinates:
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

//draw paddle on canvas x and y at every interval
function drawPaddle() {
    ctx.beginPath();
     //draw rectangle at current paddle coordinates:
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//draw bricks based on number of rows and columns, updated every interval with busted bricks omitted
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            //check brick status (status 0 for busted or 1 for still in play and to be drawn)
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                //draw rectangle at each status 1 brick coordinates:
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
                }
            }
        }
    }

//draw and redraw canvas at each interval - used in startGame() and drawTimer()
function drawCanvas() {
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//all functions, intervals and game mechanics called here
function startGame() {
    initVar(); //reinitialise variables at every new game or level
    drawCanvas(); //initial draw canvas at the start of each game or level for countdown to start
    //disappear landing page element:
    elements.forEach(id => document.getElementById(id).style.display = "none");
    //reappear canvas element:
    canvas.style.display = "initial";
    const timer = setInterval(drawTimer, 1000); //countdown starts and clears upon setTimeout method below
    setTimeout(function game() {
        clearInterval(timer); //clear countdown interval
        //entire gameplay runs within the following setInterval method:
        const interval = setInterval(function() {
            drawCanvas(); //redraw canvas upon each interval
            drawPaddle(); //redraw paddle upon each interval at updated location
            drawText(score); //redraw score upon each interval with updated data
            drawBall(); //redraw ball upon each interval at updated location
            drawBricks(); //redraw bricks upon each interval with updated data
            collisionDetection(); //run collision detection at each interval to ascertain if a brick has been busted
            //check if game has been won - variable updated in collisionDetection() when last brick is busted
            if (won) {
                level ++; //level increments by 1 - 1 additional row of bricks to bust when game resets
                //reappear landing page elements:
                elementsMain.forEach(id => document.getElementById(id).style.display = "block");
                //disappear canvas:
                canvas.style.display = "none";
                //check if last level has been beaten - endgame:
                if (level >= 9) {
                    gameTitle.innerHTML = "SUPERBL0CK";
                    startText.innerHTML = "start over";
                    eventTitle.innerHTML = "all " + `${level+1}` + " completed";
                    description.innerHTML = "congratulations! it looks like the paddle & ball duo cleared all the blocks in the universe thanks to you! you busted up all " + `${score}` + " blocks in the final level!";
                    level = 0; //resets level to start again
                } else {
                    //next level landing page scenario:
                    gameTitle.innerHTML = "BUSTEDBL0CK";
                    startText.innerHTML = "continue";
                    eventTitle.innerHTML = "next level: " + `${level+1}`;
                    description.innerHTML = "congratulations! it looks like the paddle & ball duo cleared all the blocks thanks to you! you busted up all " + `${score}` + " blocks!";
                }
                clearInterval(interval); //stop interval and game for landing screens user choice
            }
            //check if ball is hitting left or right side of the canvas
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                paddleDeflection = -paddleDeflection; //invert ball deflection direction
                dx = -dx; //invert ball x direction
            }
            //check if ball is hitting top of the canvas
            if (y + dy < ballRadius) {
                dy = -dy; //invert ball y direction
            //check if ball is bitting paddle
            } else if ((y + dy > canvas.height - ballRadius - paddleHeight) && (x > paddleX && x < paddleX + paddleWidth)) {
                dy = -dy; //invert ball y direction
                //deflect ball direction based on position on paddle user hits the ball at:
                paddleDeflection = (x - paddleX - paddleWidth/2) / (paddleWidth/4);
            //check if ball is falling into canvas bottom - lose game scenario
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
            x += dx + paddleDeflection; //at each interval ball moves in x direction with deflection
            y += dy; //at each interval ball moves in y direction
            //move paddle x position based on left/right keys - handled in event listeners
            if (rightPressed) {
                paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
            } else if (leftPressed) {
                paddleX = Math.max(paddleX - 7, 0);
            }
        }, 10); //interval computed every 10ms
    }, 4000) //setTimeout starts 4000ms after countdown interval
}

/* general graphics variable*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let screenWidth  = window.innerWidth;
let screenHeight = window.innerHeight;
let timeToStart = 3;
let won = false;
let level = 0;
let mute = false;

/* paddle variables */
const paddleHeight = 12;
const paddleWidth = 120;
let paddleX = (screenWidth - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let paddleDeflection = 0;

/* moving ball variables */
const ballRadius = 15;
let x = screenWidth / 2;
let y = screenHeight - ballRadius - paddleHeight - 1;
let dx = 0;
if (screenWidth > screenHeight) {
    dx = Math.round(screenWidth / 300);
} else {
    dx = Math.round(screenHeight / 300);
}
let dy = -dx;

/* brick variables */
let brickRowCount = 3;
const brickColumnCount = Math.round(screenWidth / 200);
const brickPadding = screenHeight / 50;
const brickWidth = (screenWidth - (brickPadding * (brickColumnCount + 3))) / brickColumnCount;
const brickHeight = screenHeight / 30;
const brickOffsetTop = brickPadding * 2;
const brickOffsetLeft = brickPadding * 2;

/* score */
let score = 0;

const bricks = [];

function initVar() {
    /* general graphics variable*/
    screenWidth  = window.innerWidth;
    screenHeight = window.innerHeight;
    timeToStart = 3;
    won = false;

    /* paddle variables */
    paddleX = (screenWidth - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    paddleDeflection = 0;

    /* moving ball variables */
    x = screenWidth / 2;
    y = screenHeight - ballRadius - paddleHeight - 1;

    /* score */
    score = 0;

    /* brick variables */
    brickRowCount += level;
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < (brickRowCount); r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    paddleDeflection = 0;
                    dy = -dy;
                    b.status = 0;
                    score ++;
                    if (score === brickRowCount * brickColumnCount) {
                        won = true;
                    }
                }
            }
        }
    }
}

function drawTimer() {
    drawCanvas();
    ctx.font = screenHeight.toString() + "px Necto Mono";
    ctx.fillStyle = "#0095DD";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center";
    ctx.fillText(`${timeToStart}`, canvas.width/2, canvas.height/2);
    timeToStart--;
}

function drawScore() {
    ctx.font = screenHeight.toString() + "px Necto Mono";
    ctx.fillStyle = "#0095DD";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.fillText(`${score}`, canvas.width/2, canvas.height/2);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

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

function drawCanvas() {
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
    initVar();
    drawCanvas();
    document.getElementById("game-title").style.display = "none";
    document.getElementById("runButton").style.display = "none";
    document.getElementById("event-title").style.display = "none";
    document.getElementById("description").style.display = "none";
    document.getElementById("kb1").style.display = "none";
    document.getElementById("kb2").style.display = "none";
    document.getElementById("myCanvas").style.display = "initial";
    const timer = setInterval(drawTimer, 1000);
    setTimeout(function game() {
        clearInterval(timer);
        const interval = setInterval(function() {
            drawCanvas();
            drawPaddle();
            drawScore();
            drawBall();
            drawBricks();
            collisionDetection();
            if (won) {
                level ++;
                document.getElementById("game-title").style.display = "block";
                document.getElementById("runButton").style.display = "block";
                document.getElementById("event-title").style.display = "block";
                document.getElementById("description").style.display = "block";
                document.getElementById("myCanvas").style.display = "none";
                if (level >= 9) {
                    document.getElementById("game-title").innerHTML = "SUPERBL0CK";
                    document.getElementById("start").innerHTML = "start over";
                    document.getElementById("event-title").innerHTML = "all " + `${level+1}` + " completed";
                    document.getElementById("description").innerHTML = "congratulations! it looks like the paddle & ball duo cleared all the blocks in the universe thanks to you! you busted up all " + `${score}` + " blocks in the final level!";
                    level = 0;
                } else {
                    document.getElementById("game-title").innerHTML = "BUSTEDBL0CK";
                    document.getElementById("start").innerHTML = "continue";
                    document.getElementById("event-title").innerHTML = "next level: " + `${level+1}`;
                    document.getElementById("description").innerHTML = "congratulations! it looks like the paddle & ball duo cleared all the blocks thanks to you! you busted up all " + `${score}` + " blocks!";
                }
                clearInterval(interval);
            }
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                paddleDeflection = 0;
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if ((y + dy > canvas.height - ballRadius - paddleHeight) && (x > paddleX && x < paddleX + paddleWidth)) {
                dy = -dy;
                paddleDeflection = (x - paddleX - paddleWidth/2) / (paddleWidth/4);
            } else if (y + dy > canvas.height - ballRadius) {
                document.getElementById("myCanvas").style.display = "none";
                document.getElementById("game-title").innerHTML = "BL0CKBUSTED";
                document.getElementById("start").innerHTML = "bounce back!";
                document.getElementById("event-title").innerHTML = "levels completed: " + `${level}`;
                document.getElementById("description").innerHTML = "looks like the blocks have prevailed against the paddle & ball duo this time... you managed to bust " + `${score}` + "/" + `${brickRowCount * brickColumnCount}` + " blocks before going down";
                document.getElementById("game-title").style.display = "block";
                document.getElementById("runButton").style.display = "block";
                document.getElementById("event-title").style.display = "block";
                document.getElementById("description").style.display = "block";
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
    }, 4000)
}

//mute music on/off
document.getElementById("sound").addEventListener("click", function () {
    if (mute) {
        document.getElementById("sound1").style.display = "initial";
        document.getElementById("sound2").style.display = "initial";
        document.getElementById("music").muted = false;
        document.getElementById("music").play;
        mute = false;
    } else {
        document.getElementById("sound1").style.display = "none";
        document.getElementById("sound2").style.display = "none";
        document.getElementById("music").muted = true;
        document.getElementById("music").pause;
        mute = true;
    }
});

//run game
document.getElementById("myCanvas").style.display = "none";
document.getElementById("runButton").addEventListener("click", function () {
    startGame();
    });
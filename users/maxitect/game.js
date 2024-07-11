/* general graphics variable*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let screenWidth  = window.innerWidth;
let screenHeight = window.innerHeight;
let timeToStart = 3;
let won = false;
/* moving ball variables */
let ballRadius = 0;
if (screenWidth > screenHeight) {
    ballRadius = Math.round(screenWidth / 80);
} else {
    ballRadius = Math.round(screenHeight / 60);
}
let x = screenWidth / 2;
let y = screenHeight - 30;
let dx = 0;
if (screenWidth > screenHeight) {
    dx = Math.round(screenWidth / 300);
} else {
    dx = Math.round(screenHeight / 300);
}
let dy = -dx;

/* paddle variables */
const paddleHeight = screenHeight / 50;
const paddleWidth = screenWidth / 10;
let paddleX = (screenWidth - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
/* brick variables */
const brickRowCount = Math.round(screenHeight / 100);
const brickColumnCount = Math.round(screenWidth / 200);
const brickPadding = screenWidth / 75;
const brickWidth = (screenWidth - (brickPadding * (brickColumnCount + 3))) / brickColumnCount;
const brickHeight = brickWidth / 5;
const brickOffsetTop = brickPadding * 2;
const brickOffsetLeft = brickPadding * 2;
/* score */
let score = 0;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
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
    if (timeToStart > 0) {
        ctx.font = screenHeight.toString() + "px Necto Mono";
        ctx.fillStyle = "#0095DD";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center";
        ctx.fillText(`${timeToStart}`, canvas.width/2, canvas.height/2);
        timeToStart--;
    } else {
        clearInterval(timer);
    }
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

function draw() {
    drawCanvas();
    drawPaddle();
    drawScore();
    drawBall();
    drawBricks();
    collisionDetection();
    if (won) {
        drawCanvas();
        ctx.font = "bold " + (screenWidth/7.5).toString() + "px Necto Mono"; 
        ctx.fillStyle = "white";
        ctx.textBaseline = 'middle';  
        ctx.textAlign = 'center';
        ctx.fillText("BUSTEDBL0CKS", canvas.width/2, (screenWidth/15)/2 + screenWidth/14.4);
        ctx.font = (screenWidth/40).toString() + "px Necto Mono";
        ctx.fillText("congratulations! it looks like the paddle &", canvas.width/2, canvas.height/2);
        ctx.fillText("ball duo cleared all the blocks thanks to you!", canvas.width/2, canvas.height/2 + screenWidth/40);
        ctx.fillText("you busted up all " + `${score}` + " blocks", canvas.width/2, canvas.height/2 + screenWidth/20);
        ctx.fillText("reload page for a new (yet remarkably similar!) adventure!", canvas.width/2, canvas.height/2 + screenWidth/10);
        clearInterval(interval);
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            drawCanvas();
            ctx.font = "bold " + (screenWidth/7.2).toString() + "px Necto Mono"; 
            ctx.fillStyle = "white";
            ctx.textBaseline = 'middle';  
            ctx.textAlign = 'center';
            ctx.fillText("BL0CKBUSTED", canvas.width/2, (screenWidth/14.4)/2 + screenWidth/14.4);
            ctx.font = (screenWidth/40).toString() + "px Necto Mono";
            ctx.fillText("looks like the blocks have prevailed", canvas.width/2, canvas.height/2);
            ctx.fillText("against the paddle & ball duo this time...", canvas.width/2, canvas.height/2 + screenWidth/40);
            ctx.fillText("you managed to bust " + `${score}` + "/" + `${brickRowCount * brickColumnCount}` + " blocks before going down", canvas.width/2, canvas.height/2 + screenWidth/20);
            ctx.fillText("reload page to bounce back against those blasted blocks", canvas.width/2, canvas.height/2 + screenWidth/10);
            clearInterval(interval);
        }
    }
    x += dx;
    y += dy;
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }
}

function startGame() {
    const timer = setInterval(drawTimer, 1000);
    setTimeout(function game() {
        clearInterval(timer);
        const interval = setInterval(draw, 10);
    }, 4000)
}
document.getElementById("runButton").addEventListener("click", function () {
startGame();
this.disabled = true;
});
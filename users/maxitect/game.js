/* general graphics variable*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
/* moving ball variables */
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
/* paddle variables */
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
/* brick variables */
const brickRowCount = 8;
const brickColumnCount = 10;
const brickWidth = 40;
const brickHeight = 10;
const brickPadding = 6;
const brickOffsetTop = 12;
const brickOffsetLeft = 12;
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
                        alert("amazing ball control, you beat the game!");
                        ctx.font = "300px Necto Mono";
                        ctx.fillStyle = "#0095DD";
                        ctx.textBaseline = 'middle'; 
                        ctx.textAlign = 'center'; 
                        ctx.fillText("win", canvas.width/2, canvas.height/2);
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "400px Necto Mono";
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    collisionDetection();
    drawScore();
    drawBall();
    drawBricks();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("you've run out of steam! click to try and bounce back...");
            ctx.font = "300px Necto Mono";
            ctx.fillStyle = "#0095DD";
            ctx.textBaseline = 'middle'; 
            ctx.textAlign = 'center'; 
            ctx.fillText("fin", canvas.width/2, canvas.height/2);
            document.location.reload();
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
    const interval = setInterval(draw, 10);
}
document.getElementById("runButton").addEventListener("click", function () {
startGame();
this.disabled = true;
});
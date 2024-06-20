const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
const ballSpeed = 4;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];

let animationFrameId;
let lives = 3;
let score = 0;

//ball coodinates and motion
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = ballSpeed;
let dy = -ballSpeed;

//paddle placement
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

//bricks array
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBall () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
    );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks () {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore () {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives () {
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function movePaddle (e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function stopPaddle (e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function followMouse (e) {
    const relativeX = e.clientX - canvas.offsetLeft;

    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function detectCollisionWithBricks () {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];

            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert('Congratulations, you won!! Play again?');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // shift ball
    x += dx;
    y += dy;

    // shift paddle without leaving canvas
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    //collision detection
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            lives--;

            if (!lives) {
                endGame();
            } else if (lives > 0) {
                alert(`1 life down, ${lives} left.`);
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = ballSpeed;
                dy = -ballSpeed;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    detectCollisionWithBricks();
    drawPaddle();
    drawBall();
    drawBricks();
    drawScore();
    drawLives();

    animationFrameId = requestAnimationFrame(draw);
}

function startGame () {
    draw();
    document.addEventListener('keydown', movePaddle, false);
    document.addEventListener('keyup', stopPaddle, false);
    document.addEventListener('mousemove', followMouse, false);
}

function endGame () {
    cancelAnimationFrame(animationFrameId);
    alert(`You hit ${score} blocks before you lost all your lives. Play again?`);
    document.location.reload();
}

document
.getElementById('start')
.addEventListener('click', function () {
    startGame();
    this.disabled = true;
});

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const levelSettings = [
    {
        ballRadius: 10,
        ballSpeed: 4,
        paddleHeight: 10,
        paddleWidth: 80,
        brickRowCount: 3,
        brickColumnCount: 5,
        brickWidth: 75,
        brickHeight: 20,
        brickPadding: 10,
        brickOffsetTop: 30,
        brickOffsetLeft: 30
    }, {
        ballRadius: 8,
        ballSpeed: 5,
        paddleHeight: 10,
        paddleWidth: 95,
        brickRowCount: 5,
        brickColumnCount: 5,
        brickWidth: 75,
        brickHeight: 20,
        brickPadding: 10,
        brickOffsetTop: 40,
        brickOffsetLeft: 30
    }
]

const bricks = [];

let animationFrameId;

let lives = 3;
let level = 0;
let score = 0;
let settings;
let bricksRemaining;

//ball coodinates and motion
let x;
let y;
let dx;
let dy;

//paddle placement
let paddleX;
let rightPressed;
let leftPressed;

function loadLevel () {
    settings = levelSettings[level];
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = settings.ballSpeed;
    dy = -settings.ballSpeed;
    paddleX = (canvas.width - settings.paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;

    for (let c = 0; c < settings.brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < settings.brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    bricksRemaining = settings.brickColumnCount * settings.brickRowCount;
}

function drawBall () {
    ctx.beginPath();
    ctx.arc(x, y, settings.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(
        paddleX,
        canvas.height - settings.paddleHeight,
        settings.paddleWidth,
        settings.paddleHeight
    );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks () {
    for (let c = 0; c < settings.brickColumnCount; c++) {
        for (let r = 0; r < settings.brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (settings.brickWidth + settings.brickPadding) + settings.brickOffsetLeft;
                const brickY = r * (settings.brickHeight + settings.brickPadding) + settings.brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, settings.brickWidth, settings.brickHeight);
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
        paddleX = relativeX - settings.paddleWidth / 2;
    }
}

function detectCollisionWithBricks () {
    for (let c = 0; c < settings.brickColumnCount; c++) {
        for (let r = 0; r < settings.brickRowCount; r++) {
            const b = bricks[c][r];

            if (b.status === 1) {
                if (x > b.x && x < b.x + settings.brickWidth && y > b.y && y < b.y + settings.brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    bricksRemaining--;
                    if (!bricksRemaining) {
                        if (level == levelSettings.length - 1) {
                            alert('Congratulations, you won!! Play again?');
                            document.location.reload();
                        } else {
                            level++;
                            alert('Well done! Ready for the next level?');
                            loadLevel();
                        }
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
        paddleX = Math.min(paddleX + 7, canvas.width - settings.paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    //collision detection
    if (x + dx < settings.ballRadius || x + dx > canvas.width - settings.ballRadius) {
        dx = -dx;
    }
    if (y + dy < settings.ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - settings.ballRadius) {
        if (x > paddleX && x < paddleX + settings.paddleWidth) {
            dy = -dy
        } else {
            lives--;

            if (!lives) {
                endGame();
            } else if (lives > 0) {
                alert(`1 life down, ${lives} left.`);
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = settings.ballSpeed;
                dy = -settings.ballSpeed;
                paddleX = (canvas.width - settings.paddleWidth) / 2;
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
    loadLevel();
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

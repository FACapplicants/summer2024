const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogue-box');
const levelDisplay = document.getElementById('level-display');

canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
  x: 50,
  y: 550,
  width: 45,
  height: 55,
  speed: 10,
  jumpForce: 15,
  velocityY: 0,
  isJumping: false,
};

// Game state
let gameLoop;
let platforms = [];
let npcs = [];
let currentDialogue = '';
let currentLevel = 1;

// Level designs
const levels = [
  {
    platforms: [
      { x: 0, y: 590, width: 800, height: 10 },
      { x: 300, y: 450, width: 200, height: 10 },
    ],
    npcs: [{ x: 700, y: 530, width: 20, height: 60, dialogue: "Just pass over me. I don't mind." }],
    playerStart: { x: 50, y: 550 },
  },
  {
    platforms: [
      { x: 0, y: 590, width: 800, height: 10 },
      { x: 100, y: 450, width: 200, height: 10 },
      { x: 290, y: 350, width: 200, height: 10 },
      { x: 450, y: 250, width: 550, height: 10 },
    ],
    npcs: [
      { x: 300, y: 530, width: 50, height: 60, dialogue: 'Got to go up this time!' },
      { x: 650, y: 180, width: 40, height: 60, dialogue: 'The meaning of life is beyond me!' },
    ],
    playerStart: { x: 50, y: 550 },
  },
  // Can add one or two more levels here
];

// Initialize game
function startGame() {
  currentLevel = 1;
  loadLevel(currentLevel);
  gameLoop = setInterval(update, 1000 / 60);
}

// Load level
function loadLevel(levelNumber) {
  const level = levels[levelNumber - 1];
  platforms = level.platforms;
  npcs = level.npcs;
  player.x = level.playerStart.x;
  player.y = level.playerStart.y;
  updateLevelDisplay();
}

// Update level display
function updateLevelDisplay() {
  levelDisplay.textContent = `Level: ${currentLevel}`;
}

// Update game state
function update() {
  handleInput();
  applyGravity();
  checkCollisions();
  checkLevelCompletion();
  render();
}

// Handle user input
function handleInput() {
  document.onkeydown = function (e) {
    switch (e.key) {
      case 'ArrowLeft':
        player.x -= player.speed;
        break;
      case 'ArrowRight':
        player.x += player.speed;
        break;
      case 'ArrowUp':
        if (!player.isJumping) jump();
        break;
      case 'Enter':
        interactWithNPC();
        break;
    }
  };
}

// Apply gravity to player
function applyGravity() {
  player.velocityY += 0.8;
  player.y += player.velocityY;
}

// Check collisions with platforms and NPCs
function checkCollisions() {
  // Platform collisions
  for (let platform of platforms) {
    if (
      player.y + player.height > platform.y &&
      player.y < platform.y + platform.height &&
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x
    ) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.isJumping = false;
    }
  }

  // NPC collisions (for interaction)
  for (let npc of npcs) {
    if (Math.abs(player.x - npc.x) < 50 && Math.abs(player.y - npc.y) < 50) {
      currentDialogue = npc.dialogue;
      return;
    }
  }
  currentDialogue = '';
}

// Check if level is completed
function checkLevelCompletion() {
  if (player.x > canvas.width - player.width) {
    currentLevel++;
    if (currentLevel <= levels.length) {
      loadLevel(currentLevel);
    } else {
      // Game completed
      // Move to next page of the website
      endGame();
    }
  }
}

function endGame() {
  clearInterval(gameLoop);
  document.getElementById('game-container').classList.add('invis');
  document.getElementById('after-game').classList.remove('invis');
}

// Make the player jump
function jump() {
  player.velocityY = -player.jumpForce;
  player.isJumping = true;
}

// Interact with nearby NPC
function interactWithNPC() {
  if (currentDialogue) {
    dialogueBox.style.display = 'block';
    dialogueBox.textContent = currentDialogue;
    setTimeout(() => {
      dialogueBox.style.display = 'none';
    }, 3000);
  } else {
    dialogueBox.style.display = 'none';
  }
}

// Render game objects
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw platforms
  ctx.fillStyle = 'green';
  for (let platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }

  // Draw NPCs
  ctx.fillStyle = 'white';
  for (let npc of npcs) {
    ctx.fillRect(npc.x, npc.y, npc.width, npc.height);
  }
}

// Start the game
startGame();

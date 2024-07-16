const timerElement = document.getElementById('countdown');
const wordElement = document.getElementById('word');
const textInput = document.getElementById('text-input');
const wpmElement = document.getElementById('wpm');
const mainContainer = document.getElementById('main');
const resetContainer = document.getElementById('reset');
const resetBtn = document.getElementById('reset-btn');

const duration = 120;
let interval;
let timerStarted = false;

const phrase = `Creating and building have always driven my professional journey, leading me to transition into software development. With experience in kitchen management and screenwriting, I bring unique creativity, teamwork, and problem-solving skills to tech. My recent 16-week Full Stack Developer bootcamp at School of Code equipped me with proficiency in Next.js, TypeScript, Node, and PostgreSQL. I excel in fast-paced environments, as shown by my success in Hackathons and collaborative projects. My computational thinking and eagerness to learn make me well-suited for software development. Whether designing interfaces, managing databases, or implementing full-stack solutions, I'm committed to applying my diverse skill set to drive innovation in tech.`;

const text = phrase.replace(/[\r\n]+\s*/g, ' ').replace(/\s{2,}/g, ' ');

const displayLength = 80;

function startTimer() {
  let timer = duration;
  interval = setInterval(() => {
    timer--;
    timerElement.textContent = `${timer}s`;
    if (timer <= 0) {
      clearInterval(interval);
      timerElement.textContent = "Time's up!";
      updateResults();
    }
  }, 1000);
}

function updateDisplay() {
  const typedText = textInput.value;
  let displayText = '';
  let startIndex = Math.max(0, typedText.length - displayLength / 2);
  let endIndex = startIndex + displayLength;

  for (let i = startIndex; i < endIndex && i < text.length; i++) {
    if (i < typedText.length) {
      if (text[i] === typedText[i]) {
        displayText += `<span class="correct">${text[i]}</span>`;
      } else {
        displayText += `<span class="incorrect">${text[i]}</span>`;
      }
    } else {
      displayText += text[i];
    }
  }

  wordElement.innerHTML = displayText;
}

function updateResults() {
  mainContainer.style.display = 'none';
  const wordsTyped = textInput.value.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped * 60) / duration);
  wpmElement.textContent = `Your speed was: ${wpm} WPM`;
  resetContainer.style.display = 'block';
}

function resetTest() {
  clearInterval(interval);
  timerStarted = false;
  timerElement.textContent = '120s';
  textInput.value = '';
  wpmElement.textContent = '';
  mainContainer.style.display = 'block';
  resetContainer.style.display = 'none';
  updateDisplay();
}

textInput.addEventListener('input', (e) => {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  updateDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
  timerElement.textContent = `${duration}s`;
});

resetBtn.addEventListener('click', resetTest);

// Initialize the display
updateDisplay();

document.getElementById('to-home').addEventListener('click', () => {
  document.getElementById('landing').classList.add('invis');
  document.getElementById('home').classList.remove('invis');
});

document.getElementById('to-game').addEventListener('click', () => {
  document.getElementById('home').classList.add('invis');
  document.getElementById('game-container').classList.remove('invis');
});

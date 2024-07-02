const dmButton = document.getElementById('darkMode');
dmButton.addEventListener('click', () => moveButton());
let c = 0;
function moveButton() {
  if (c === 0) {
    dmButton.style.right = '25px';
    c++;
  } else if (c === 1) {
    dmButton.style.right = '350px';
    c++;
  } else if (c === 2) {
    dmButton.style.right = '550px';
    c++;
  } else if (c === 3) {
    dmButton.innerHTML = "You're better off in dark mode.";
    c++;
  } else if (c === 4) {
    dmButton.innerHTML = 'Stop clicking me.';
    c++;
  } else if (c === 5) {
    dmButton.innerHTML = 'Boundaries, mate!';
    c++;
  } else if (c === 6) {
    dmButton.style.right = '0px';
    dmButton.innerHTML =
      'BACK THE FUCK OFF OR I WILL SMASH THAT BLOODY BALD HEAD OF YOUR YOU DIRTY F';
    c++;
  } else {
    dmButton.style.display = 'none';
  }
}

document.getElementById('more-info-btn').addEventListener('click', function() {
  const moreInfoDiv = document.getElementById('more-info');
  if (moreInfoDiv.style.display === 'none') {
      moreInfoDiv.style.display = 'block';
      this.textContent = 'Show Less Info';
  } else {
      moreInfoDiv.style.display = 'none';
      this.textContent = 'Show More Info';
  }
});
export function handlePageLoad() {
  window.addEventListener('load', function() {
      loadStoredContent();
  });
}

export function handleContentLoad() {
    document.addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        var href = event.target.getAttribute('href');
        if (href.startsWith('#') || !href.startsWith('http')) {
          loadContent(href);
        } else {
          window.open(href, '_blank');
        }
      }
    });
  }

function loadStoredContent() {
  var storedContentPath = localStorage.getItem('currentContentPath');
  if (storedContentPath) {
      loadContent(storedContentPath); 
  } else {
      loadContent('./content/home.html');
  }
}

function loadContent(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            MathJax.typeset();
            localStorage.setItem('currentContentPath', filePath);
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('main-content').innerHTML = 'Error loading content.';
        });
}


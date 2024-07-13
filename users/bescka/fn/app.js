// TODO: Accessibility features/SEO with hash navigation?
// TODO: testing framework

export function handleNavigation() {
  function handleContent() {
    const path = window.location.hash.substring(2);
    if (path || path !== '') {
      loadContent(path);
    } else {
      loadDefaultContent();
    }
  }  
  window.addEventListener('load', handleContent);
  window.addEventListener('hashchange', handleContent);
  window.addEventListener('popstate', handleContent);
};

function loadContent(path) {
  const isHosted = window.location.hostname === 'facapplicants.github.io';
  const basePath = isHosted ? 'summer2024/users/bescka' : '';
  const fetchPath = `${basePath}/content/${path}.html`;
  fetch(fetchPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response error');
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
      MathJax.typeset();
      // TODO: maybe link intercepting would work better for anchor elements?
      // so don't have multiple history elements when you press the back button
      const newHash = `#/${path}`;
      if (window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    })
    .catch(error => {
      console.error('Error loading content:', error);
      document.getElementById('main-content').innerHTML = 'Error loading content.';
    });
}

function loadDefaultContent() {
  loadContent('home');
  history.pushState(null, '', '/#/home'); 
}
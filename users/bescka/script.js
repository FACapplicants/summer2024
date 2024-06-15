// The syntax of an eventlistener is quite literally if x type of event happens, 
// do y. 
document.addEventListener(type='click', function(event){
    var dropdownMenu = document.getElementsByClassName('dropdown-menu');
    var dropdownButton = document.getElementsByClassName('dropdown-button');

    // event.target is just the thing that the event - a click in this case - happens to 
    if (!dropdownMenu.contains(event.target)) { 
        dropdownMenu.style.display = 'none';
    }
    if (dropdownButton.contains(event.target)){
        // 
        var dropdown = button.nextElementSibling;
        dropdown.style.display = dropdown.style.display == 'block' ? 'none' : 'block';
    }
});

// TODO: DOM
document.addEventListener('DOMContentLoaded', function() {
    function loadContent(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                // TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
                document.getElementById('main-content').innerHTML = html;
                MathJax.typeset();
            })
            .catch(error => {
                console.error('Error loading content:', error);
                document.getElementById('main-content').innerHTML = 'Error loading content.';
            });
    }

    // Event listener for links within the main content
    document.getElementById('main-content').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') { 
            event.preventDefault();
            var href = event.target.getAttribute('href');
            if (href.startsWith('#') || !href.startsWith('http')) { // || is logical "or" in JS
                loadContent(href);
            } else {
                window.open(href, '_blank');
            }
        }
    });

    // Event listeners for navigation links: 
    document.getElementById('home-link').addEventListener('click', function(event) {
        event.preventDefault(); // prevents "Default" behaviour - in this case following the link
        loadContent('./content/home.html');
    });

    // Here we set up a JS "Object"
    // A slight semantical difference from python dictionaries is that 
    // In JS, Objects are collections of "Properties" which then have keys/ values
    // Accessing the values associated with keys is done with obj['key'] or obj.key
    // I've used obj['key']. I blame pandas. 
    // TODO https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md
    const dropdownLinks = {
        'dropdown-home-link': './content/home.html', 
        'dropdown-about-link': './content/about.html', 
        'dropdown-articles-link': './content/articles.html',
    }
    
    // In this function, "hasOwnProperty" returns a bool if the object has the 
    // specified property rather than inheriting it.
    function handleLinkClick(event){
        event.preventDefault();
        const linkId = event.target.id;
        if (dropdownLinks.hasOwnProperty(linkId)) {
            loadContent(dropdownLinks[linkId]);
        }
    };

    // TODO Object breakdown/ static object ref
    Object.keys(dropdownLinks).forEach(function(linkId) {
        document.getElementById(linkId).addEventListener(type='click', handleLinkClick);
    });

    // Load home page by default
    window.addEventListener('load', function() {
        loadContent('./content/home.html');
    });
});

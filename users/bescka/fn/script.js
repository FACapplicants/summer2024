// TODO: Event Listeners
document.addEventListener('click', function(event) {
    var dropdownMenus = document.getElementsByClassName('dropdown-menu');
    var dropdownButton = document.getElementsByClassName('dropdown-button');

    var dropdownMenusArray = Array.from(dropdownMenus);

    var isOutsideDropdownMenus = dropdownMenusArray.every(function(menu) {
        return !menu.contains(event.target);
    });

    if (isOutsideDropdownMenus) {
        dropdownMenusArray.forEach(function(menu) {
            menu.style.display = 'none';
        });
    }

    if (dropdownButton[0].contains(event.target)) {
        var dropdown = dropdownButton[0].nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
});

// TODO: DOM
document.addEventListener('DOMContentLoaded', function() {
    function loadContent(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(html => {
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

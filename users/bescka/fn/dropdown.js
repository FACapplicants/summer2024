export function handleDropdownBehaviour() {
  const dropdownMenu = document.getElementById('dropdown-menu'); 
  const dropdownButton = document.getElementById('dropdown-button'); 

  dropdownButton.addEventListener('click', function() {
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
  });

  document.addEventListener('click', function(event) {
    if (!dropdownMenu.contains(event.target) && event.target !== dropdownButton) {
      dropdownMenu.style.display = 'none';
    }
  });

  dropdownMenu.addEventListener('mouseleave', function() {
    this.style.display = 'none';
  });
}

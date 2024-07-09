function validateForm() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const messageInput = document.getElementById('message').value;

    const nameError = document.getElementById("name-error");
    nameError.textContent = "";

    const emailError = document.getElementById('email-error');
    emailError.textContent = "";

    const messageError = document.getElementById('message-error');
    messageError.textContent = "";

    //get the modal box
    const modal = document.getElementsByClassName("modal");
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let isValid = true;

    if (nameInput === "" || /\d/.test(nameInput)) {
        nameError.textContent = "Please enter your name properly";
        nameError.classList.add('error');
        isValid = false;
    }

    if (emailInput === "" || emailRegExp.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        emailError.classList.add('error');
        isValid = false;
    }

    if (messageInput === "" || /\d/.test(messageInput)) {
        messageError.textContent = "Please enter your message";
        messageError.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {       
       // When the user clicks the button, open the modal 
        modal.style.display = "block";
        
    }
    // When the user clicks on <span> (x), close the modal
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    return isValid; // Prevent default form submission for demonstration purposes

};




  
  


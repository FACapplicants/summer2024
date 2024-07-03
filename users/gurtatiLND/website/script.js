function validateForm() {
    const form = document.getElementsByClassName('contact-form').value;
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const messageInput = document.getElementById('message').value;

    const nameError = document.getElementById("name-error");
    nameError.textContent = "";

    const emailError = document.getElementById('email-error');
    emailError.textContent = "";

    const messageError = document.getElementById('message-error');
    messageError.textContent = "";

    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let isValid = true;

    if (nameInput === "" || /\d/.test(nameInput)) {
        nameError.textContent = "Please enter your name properly";
        isValid = false;
    }

    if (emailInput === "" || emailRegExp.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    }

    if (messageInput === "" || /\d/.test(messageInput)) {
        messageError.textContent = "Please enter your message";
        isValid = false;
    }
    return isValid;

};
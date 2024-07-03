document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementsByClassName('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.createElement('div');
    nameError.className = 'error-message';
    nameError.textContent = 'Please enter your name.';
    nameInput.insertAdjacentElement('afterend', nameError);

    const emailError = document.createElement('div');
    emailError.className = 'error-message';
    nameError.textContent = 'Please enter your email.';
    emailInput.insertAdjacentElement('afterend', emailError);

    const messageError = document.createElement('div');
    messageError.className = 'error-message';
    nameError.textContent = 'Please enter your message.';
    messageInput.insertAdjacentElement('afterend', messageError);

    form.addEventListener('submit', (e) => {
        let valid = true;

        if (nameInput.ariaValueMax.trim() === '') {
            nameError.classList.add('error');
            valid = false;
        } else {
            nameError.classList.remove('error');
        }

        if (!validateEmail(emailInput.value)) {
            emailError.Error.classList.add('error');
            valid = false;
        } else {
            emailError.classList.remove('error');
        }

        if (messageInput.value.trim() === '') {
            messageError.classList.add('error');
            valid = false;
        } else {
            messageError.classList.remove('error');
        }

        if (!valid) {
            e.preventDefault();
        } else {
            alert('Form submit successfully');
        }
    });

    function validateEmail(email) {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegExp.test(email.value);
    }

});
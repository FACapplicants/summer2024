const openBtn = document.querySelector("#modalBtn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");

function openModal() {
	modal.classList.remove("hide");
}

function closeModal(e, clickedOutside) {
	if (clickedOutside) {
		if (e.target.classList.contains("modal"))
			modal.classList.add("hide");
	} else modal.classList.add("hide");
}

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
       openBtn.addEventListener("click", openModal);
       modal.addEventListener("click", (e) => closeModal(e, true));
       closeBtn.addEventListener("click", closeModal);       
    }
    return false;
};




  
  


document.addEventListener('DOMContentLoaded', () => {
   const form = document.querySelector('.contact-form');
   const openBtn = document.getElementById("modalBtn");
   const modal = document.querySelector(".modal");
   const closeBtn = document.querySelector(".close");

   function closeModal(e, clickedOutside) {
	if (clickedOutside) {
		if (e.target.classList.contains("modal"))
			modal.classList.add("hide");
 	} else modal.classList.add("hide");
   };

// When the user clicks the button, open the modal 
   openBtn.addEventListener("click", function() {
	if (form.checkValidity()) {
		modal.classList.remove("hide");
	} else {
		form.reportValidity();
	}
   });

   modal.addEventListener("click", (e) => {
	  closeModal(e, true);
	  location.reload();
   });
   closeBtn.addEventListener("click", () => {
	  closeModal;
	  location.reload(); 
   });
	      
});
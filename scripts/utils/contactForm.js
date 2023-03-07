// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


const form = document.querySelector("form");

const submitBtn = document.querySelector(".btn-submit");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


// inputs validation functions 

function FirstNameValidation() {
    const inputValue = firstNameInput.value;
      // on verifie que l'input est non null et qu'il contient plus de 2 caracteres
        if (inputValue !== null && inputValue.length > 2) return true;
        else return false;
}
    
function LastNameValidation() {
    let inputValue = lastNameInput.value;
      if (inputValue !== null && inputValue.length > 2) return true;
      else return false;
}

function emailValidation() { 
    const mailFormat = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    const inputValue = document.getElementById("email").value;
    // on verifie que l'input correspond au format d'une adresse mail
    if (mailFormat.test(inputValue)) {
      return true;
    }
    else {
      return false;
    }
}
function messageValidation() {
    let inputValue = messageInput.value;
    if (inputValue !== null && inputValue.length > 5) return true;
    else return false;
}

// on créé les différents messages d'erreur
const errorMessages = {
	lastName: "Veuillez entrer un nom comportant 2 caractères ou plus.",
	firstName: "Veuillez entrer un prénom comportant 2 caractères ou plus.",
	email: "Veuillez entrer une adresse email valide.",
	message: "Veuillez entrer un message comportant 5 caractères ou plus.",
};

submitBtn.addEventListener("click", function(e) {

    e.preventDefault();
  let isValidInput = true;
  // on verifie pour chaque input que l'information saisie est conforme sinon on affiche le message d'erreur pour cet input
  if (!FirstNameValidation()) {
		isValidInput = false;
    // si la validation renvoie false alors on affiche le message d'erreur et le changement de style du champ
    firstNameInput.parentElement.setAttribute( "data-error", errorMessages.firstName);
    firstNameInput.parentElement.setAttribute( "data-error-visible",true);
    
	}
  else firstNameInput.parentElement.setAttribute( "data-error-visible",false);
	if (!LastNameValidation()) {
		isValidInput = false;
    lastNameInput.parentElement.setAttribute( "data-error", errorMessages.lastName);
    lastNameInput.parentElement.setAttribute( "data-error-visible",true);
	}
  else lastNameInput.parentElement.setAttribute( "data-error-visible",false);
  if (!emailValidation()) {
		isValidInput = false;
    emailInput.parentElement.setAttribute( "data-error", errorMessages.email);
    emailInput.parentElement.setAttribute( "data-error-visible",true);
    
	}
  else emailInput.parentElement.setAttribute( "data-error-visible",false);
  if (!messageValidation()) {
		isValidInput = false;
    messageInput.parentElement.setAttribute( "data-error", errorMessages.message);
    messageInput.parentElement.setAttribute( "data-error-visible",true);
    
	}

    // si toutes les informations sont correctes on console.log les données entrées, on ferme le modal et on reset les entrées du formulaire
  if (isValidInput) {
    console.log(firstNameInput.value);
    console.log(lastNameInput.value);
    console.log(emailInput.value);
    console.log(messageInput.value);
    closeModal();
    form.reset();
  }
    

});



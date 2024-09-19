// flash message
const flashMessageModal = document.getElementById("flash-modal");
const flashModalContent = document.getElementById("modalContent");
const flashModalClose = document.getElementById("modalCloseBtn");

document.addEventListener("DOMContentLoaded", handleFormSubmit);

function handleFormSubmit() {
  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (form && form.classList.contains("form")) {
      event.preventDefault();
      const formData = new FormData(form);
      console.log(Object.fromEntries(formData));
      const action = form.action;
      const method = form.method || "POST";

      // making request
      try {
        const response = await fetch(action, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });

        const data = await response.json();
        console.log(data);
        // display flash message based on status
        displayFlashMessage(data);
      } catch (err) {
        console.log(err);
      }
    }
  });
}

// display flash message based on status
function displayFlashMessage(data) {
  const flashMessage = data.message;
  const status = data.status;

  //display flash modal
  flashMessageModal.classList.add("show");
  flashModalContent.classList.add("display");

  flashModalContent.children[1].textContent = flashMessage;

  if (status === true) {
    flashModalContent.children[0].innerHTML = `<i class="fas fa-check-circle success"></i>`;
    flashModalContent.style.borderLeft = "5px solid #28a745";
  }
  if (status === false) {
    flashModalContent.children[0].innerHTML = `<i class="fas fa-exclamation-circle error"></i>`;
    flashModalContent.style.borderLeft = "5px solid #dc3545";
  }

  setTimeout(hideFlashMessage, 2000);
  if (data.redirectUrl) window.location.href = data.redirectUrl;
}

function hideFlashMessage() {
  flashMessageModal.classList.remove("show");
  flashModalContent.classList.remove("display");
}

//close flash message modal
flashModalClose.addEventListener("click", hideFlashMessage);

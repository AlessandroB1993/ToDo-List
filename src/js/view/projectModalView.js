const projectForm = document.querySelector(".project-form");
const projectModalContainer = document.getElementById(
  "project-modal-container"
);

function closeModal(el) {
  el.classList.remove("show");
  projectForm.reset();
}

function closeModalOverlay(e) {
  if (!e.target.classList.contains("modal-container")) return;
  e.target.classList.remove("show");
}

function showModal() {
  projectModalContainer.classList.remove("hidden");
  projectModalContainer.classList.add("show");
}

export { closeModal, closeModalOverlay, showModal };

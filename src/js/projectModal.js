import { projectForm, projectModalContainer } from "./domSelecting";

function closeModal(el) {
  el.classList.remove("show");
  projectForm.reset();
}

const closeModalOverlay = (e) => {
  if (!e.target.classList.contains("modal-container")) return;
  e.target.classList.remove("show");
};

const openModal = () => {
  projectModalContainer.classList.remove("hidden");
  projectModalContainer.classList.add("show");
};

export { closeModal, closeModalOverlay, openModal };

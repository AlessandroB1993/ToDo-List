import { projectForm, projectModalContainer } from "./domSelecting";

function closeModal(el) {
  el.classList.remove("show");
  projectForm.reset();
}

const closeModalOverlay = (e) => {
  if (!e.target.classList.contains("modal-container")) return;
  projectModalContainer.classList.remove("show");
};

const openModal = () => {
  projectModalContainer.classList.add("show");
};

export { closeModal, closeModalOverlay, openModal };

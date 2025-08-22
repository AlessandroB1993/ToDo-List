const closeModal = () => {
  modalContainer.classList.remove("show");
  projectForm.reset();
};

const closeModalOverlay = (e) => {
  if (!e.target.classList.contains("modal-container")) return;
  modalContainer.classList.remove("show");
};

export { closeModal, closeModalOverlay };

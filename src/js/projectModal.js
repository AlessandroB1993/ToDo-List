const modalContainer = document.getElementById("modal-container");

const closeModal = () => {
  modalContainer.classList.remove("show");
  projectForm.reset();
};

const closeModalOverlay = (e) => {
  if (!e.target.classList.contains("modal-container")) return;
  modalContainer.classList.remove("show");
};

const openModal = () => {
  modalContainer.classList.add("show");
};

export { closeModal, closeModalOverlay, openModal };

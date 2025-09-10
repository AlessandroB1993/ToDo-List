import {
  closeModal,
  closeModalOverlay,
  showModal,
} from "../view/projectModalView";

const addProjectBtn = document.getElementById("add-project");
const closeModalBtn = document.getElementById("close-project-form");
const projectModalContainer = document.getElementById(
  "project-modal-container"
);

export function initAddProjectController() {
  addProjectBtn.addEventListener("click", showModal);
  projectModalContainer.addEventListener("click", closeModalOverlay);
  closeModalBtn.addEventListener("click", () => {
    closeModal(projectModalContainer);
  });
}

import {
  closeModal,
  closeModalOverlay,
  showModal,
} from "../view/projectModalView";

const addProjectBtn = document.getElementById(
  "add-project"
) as HTMLButtonElement | null;
const closeModalBtn = document.getElementById(
  "close-project-form"
) as HTMLButtonElement | null;
const projectModalContainer = document.getElementById(
  "project-modal-container"
) as HTMLDivElement | null;

export function initAddProjectController() {
  if (!addProjectBtn || !closeModalBtn || !projectModalContainer) {
    console.error("One or more elements of modal are not found at the DOM");
    return;
  }

  addProjectBtn.addEventListener("click", showModal);
  projectModalContainer.addEventListener("click", closeModalOverlay);
  closeModalBtn.addEventListener("click", () => {
    closeModal(projectModalContainer);
  });
}

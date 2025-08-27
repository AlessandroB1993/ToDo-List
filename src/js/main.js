import {
  handleItemSubmit,
  handleProjectSubmit,
  updateProjectOptions,
} from "./formHandlers";
import { updateToDoList } from "./toDoList";
import { closeModal, closeModalOverlay, openModal } from "./projectModal";
import { updateProjectsList } from "./projectList";
import {
  inputForm,
  projectForm,
  addProjectBtn,
  projectModalContainer,
  completedBtn,
  closeModalBtn,
  completedItemsContainer,
} from "./domSelecting";
import "../styles.css";
import { completedItemsHandler } from "./completedItems";

// FORM SUBMITTING
inputForm.addEventListener("submit", handleItemSubmit);

projectForm.addEventListener("submit", handleProjectSubmit);

// MODALS
addProjectBtn.addEventListener("click", openModal);

projectModalContainer.addEventListener("click", closeModalOverlay);

completedBtn.addEventListener("click", completedItemsHandler);

// CLOSE BUTTONS
closeModalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.modal === "project") {
      closeModal(projectModalContainer);
    } else {
      closeModal(completedItemsContainer);
    }
  });
});

// FIRST LOADING
document.addEventListener("DOMContentLoaded", () => {
  updateProjectsList();
  updateToDoList();
  updateProjectOptions();
});

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
  closeBtn,
  modalContainer,
} from "./domSelecting";
import "../styles.css";

// FORM SUBMITTING
inputForm.addEventListener("submit", handleItemSubmit);

projectForm.addEventListener("submit", handleProjectSubmit);

// MODAL
addProjectBtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

modalContainer.addEventListener("click", closeModalOverlay);

// FIRST LOADING
document.addEventListener("DOMContentLoaded", () => {
  updateProjectsList();
  updateToDoList();
  updateProjectOptions();
});

import {
  handleChecklistSubmit,
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
  switchFormContainer,
  addChecklistItemBtn,
  checklistForm,
} from "./domSelecting";
import "../styles.css";
import { showCompletedItemsModal } from "./completedItems";
import { handleSwitchForm } from "./switchFormHandler";
import { state } from "./projectsState";

// FORM SUBMITTING
inputForm.addEventListener("submit", handleItemSubmit);
projectForm.addEventListener("submit", handleProjectSubmit);
checklistForm.addEventListener("submit", handleChecklistSubmit);

// MODALS
addProjectBtn.addEventListener("click", openModal);

projectModalContainer.addEventListener("click", closeModalOverlay);
completedItemsContainer.addEventListener("click", closeModalOverlay);

completedBtn.addEventListener("click", showCompletedItemsModal);

// SWITCH FORM
switchFormContainer.addEventListener("click", handleSwitchForm);
addChecklistItemBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const container = document.getElementById("checklist-input-container");

  const checklistItemTemplate = document.getElementById("checklist-item");
  const instance = checklistItemTemplate.content.cloneNode(true);

  container.appendChild(instance);
});

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
  updateToDoList(state.selectedType);
  updateProjectOptions();
});

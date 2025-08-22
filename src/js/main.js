import { handleItemSubmit, handleProjectSubmit } from "./formHandlers";
import { updateToDoList } from "./toDoList";
import { projectArray } from "./projectsState";
import "../styles.css";
import { closeModal, closeModalOverlay } from "./projectModal";

// DOM SELECTING
const projectsList = document.querySelector(".sidebar__list");
const inputForm = document.getElementById("input-form");
const projectForm = document.querySelector(".project-form");
const addProjectBtn = document.getElementById("add-project");
const openBtn = document.getElementById("open");
const modalContainer = document.getElementById("modal-container");
const closeBtn = document.getElementById("close");
const selectProject = document.getElementById("projectId");

function createProjectListElement(project) {
  const projEl = document.createElement("li");
  projEl.innerText = project.title;
  projEl.dataset.projectId = project.projectId;

  projEl.addEventListener("click", (e) => {
    selectedProject = projectArray.find(
      (project) =>
        project.projectId === Number(e.currentTarget.dataset.projectId)
    );
    updateToDoList();
  });

  return projEl;
}

// function updateProjectOptions() {
//   selectProject.innerHTML = "";

//   projectArray.forEach((project) => {
//     const option = document.createElement("option");
//     option.innerText = project.title;
//     option.value = project.projectId;

//     selectProject.insertAdjacentElement("beforeend", option);
//   });
// }

function updateProjectsList() {
  projectsList.innerHTML = "";
  projectArray.forEach((project) => {
    const projElement = createProjectListElement(project);
    projectsList.insertAdjacentElement("beforeend", projElement);
  });
}

// FORM SUBMITTING
inputForm.addEventListener("submit", handleItemSubmit);

projectForm.addEventListener("submit", handleProjectSubmit);

closeBtn.addEventListener("click", closeModal);

modalContainer.addEventListener("click", closeModalOverlay);

document.addEventListener("DOMContentLoaded", () => {
  updateProjectsList();
  updateToDoList();
  // updateProjectOptions();
});

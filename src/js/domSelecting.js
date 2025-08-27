// DOM SELECTING
const projectModalContainer = document.getElementById(
  "project-modal-container"
);
const completedItemsContainer = document.getElementById(
  "completed-items-container"
);
const inputForm = document.getElementById("input-form");
const projectForm = document.querySelector(".project-form");
const addProjectBtn = document.getElementById("add-project");
const closeModalBtn = document.querySelectorAll(".close-btn");
// const closeCompletedListBtn = document.getElementById("close-completed-list");
const selectProject = document.getElementById("projectId");
const toDoList = document.querySelector(".list");
const projectsList = document.querySelector(".sidebar__list");
const completedBtn = document.querySelector(".completed-items-btn");

export {
  projectModalContainer,
  completedItemsContainer,
  inputForm,
  projectForm,
  addProjectBtn,
  closeModalBtn,
  selectProject,
  toDoList,
  projectsList,
  completedBtn,
};

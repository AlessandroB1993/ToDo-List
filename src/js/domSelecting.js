// DOM SELECTING
const projectModalContainer = document.getElementById(
  "project-modal-container"
);
const completedItemsContainer = document.getElementById(
  "completed-items-container"
);
const inputForm = document.getElementById("todo-form");
const checklistForm = document.getElementById("checklist-form");
const projectForm = document.querySelector(".project-form");
const addProjectBtn = document.getElementById("add-project");
const closeModalBtn = document.querySelectorAll(".close-btn");
const selectElements = document.querySelectorAll(".projectId-input");
const toDoList = document.querySelector(".list");
const projectsList = document.querySelector(".sidebar__list");
const completedBtn = document.querySelector(".completed-items-btn");
const switchFormContainer = document.querySelector(".switch-form-container");
const addChecklistItemBtn = document.querySelector(".add-checklist-item");

export {
  projectModalContainer,
  completedItemsContainer,
  inputForm,
  checklistForm,
  projectForm,
  addProjectBtn,
  closeModalBtn,
  selectElements,
  toDoList,
  projectsList,
  completedBtn,
  switchFormContainer,
  addChecklistItemBtn,
};

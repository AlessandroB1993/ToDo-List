import { saveState } from "../model/projectsState";
import { Item } from "../model/itemModel";
import { Project } from "../model/projectModel";
import { renderProjectsList } from "../view/projectListView";
import { formatDateForTask } from "../utils/dateHandler";
import { renderChecklistField, updateProjectOptions } from "../view/formsView";
import { showToDoList } from "./todoListController";

const projectForm = document.querySelector(".project-form");
const inputForm = document.getElementById("todo-form");
const checklistForm = document.getElementById("checklist-form");
const addChecklistItemBtn = document.querySelector(".add-checklist-item");
const projectModalContainer = document.getElementById(
  "project-modal-container"
);

export function initFormsController(state) {
  const handleProjectSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData(projectForm);
    const data = Object.fromEntries(formdata.entries());

    if (!data) return;

    const newProject = new Project(data.title);
    state.projectArray.push(newProject);
    saveState(state);

    renderProjectsList(state.projectArray, state.selectedProject.projectId);
    updateProjectOptions(state.projectArray);

    projectModalContainer.classList.remove("show");
    projectForm.reset();
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(inputForm);
    const data = Object.fromEntries(formData.entries());
    data.type = state.selectedType;

    if (data.duedate) {
      data.duedate = formatDateForTask(data.duedate);
    }

    // Inserting item to a list and update localStorage
    const listItem = new Item(data);
    state.selectedProject.setItemToList(listItem);
    saveState(state);

    // Updating the DOM
    showToDoList();
  };

  function handleChecklistSubmit(e) {
    e.preventDefault();

    const formdata = new FormData(checklistForm);
    const data = Object.fromEntries(formdata.entries());
    data.type = state.selectedType;

    const tasks = formdata.getAll("task").filter((task) => task);

    if (data.duedate) {
      data.duedate = formatDateForTask(data.duedate);
    }

    const checklistItem = new Item({ ...data, tasks });
    state.selectedProject.setItemToList(checklistItem);

    saveState(state);
    showToDoList();
  }

  projectForm.addEventListener("submit", handleProjectSubmit);
  inputForm.addEventListener("submit", handleItemSubmit);
  checklistForm.addEventListener("submit", handleChecklistSubmit);
  addChecklistItemBtn.addEventListener("click", renderChecklistField);

  updateProjectOptions(state.projectArray);
}

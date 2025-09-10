import { renderProjectsList } from "../view/projectListView";
import { showToDoList } from "./todoListController";

const projectsList = document.querySelector(".sidebar__list");
const selectElements = document.querySelectorAll(".projectId-input");

export function initProjectListController(state) {
  // Renders the project list and items on first load
  renderProjectsList(state.projectArray, state.selectedProject.projectId);
  showToDoList();

  projectsList.addEventListener("click", (e) => {
    if (e.target.tagName !== "LI") return;

    const projectId = Number(e.target.dataset.projectId);

    // Select all li elements of list and remove selected class
    projectsList
      .querySelectorAll("li")
      .forEach((li) => li.classList.remove("selected-project"));

    // Clicked project highlighted as selected
    e.target.classList.add("selected-project");

    // Selected project automatically selected on create item form
    selectElements.forEach((select) => (select.value = projectId));

    state.selectedProject = state.projectArray.find(
      (project) => project.projectId === projectId
    );

    // Displays items based on the type selected
    showToDoList();
  });
}

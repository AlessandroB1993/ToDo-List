import { projectsList, selectElements } from "./domSelecting";
import { state } from "./projectsState";
import { updateToDoList } from "./toDoList";

function updateProjectsList() {
  projectsList.innerHTML = "";

  state.projectArray.forEach((project) => {
    const projElement = createProjectListElement(project);
    projectsList.insertAdjacentElement("beforeend", projElement);
  });

  projectsList.addEventListener("click", projectListHandler);
}

function createProjectListElement(project) {
  const projEl = document.createElement("li");
  projEl.innerText = project.title;
  projEl.dataset.projectId = project.projectId;

  return projEl;
}

function projectListHandler(e) {
  const projectId = Number(e.target.dataset.projectId);

  state.selectedProject = state.projectArray.find(
    (project) => project.projectId === projectId
  );

  // Select elements are updated to display the selected project automatically
  selectElements.forEach((select) => (select.value = projectId));

  // Displays only based on what type is selected on the homepage
  updateToDoList(state.selectedType);
}

export { updateProjectsList, createProjectListElement };

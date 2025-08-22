import { projectsList } from "./domSelecting";
import { state } from "./projectsState";
import { updateToDoList } from "./toDoList";

function updateProjectsList() {
  projectsList.innerHTML = "";

  state.projectArray.forEach((project) => {
    const projElement = createProjectListElement(project);
    projectsList.insertAdjacentElement("beforeend", projElement);
  });
}

function createProjectListElement(project) {
  const projEl = document.createElement("li");
  projEl.innerText = project.title;
  projEl.dataset.projectId = project.projectId;

  projEl.addEventListener("click", (e) => {
    state.selectedProject = state.projectArray.find(
      (project) =>
        project.projectId === Number(e.currentTarget.dataset.projectId)
    );
    updateToDoList();
  });

  return projEl;
}

export { updateProjectsList, createProjectListElement };

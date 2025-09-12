import { Project } from "../model/projectModel";

const projectsList = document.querySelector<HTMLUListElement>(".sidebar__list");

function renderProjectsList(
  projects: Project[],
  selectedProjectId: number
): void {
  if (!projectsList) return;

  // Clean the list, avoid duplicates
  projectsList.innerHTML = "";

  // For each project created, creates  ali element
  projects.forEach((project) => {
    const projEl = createProjectListElement(project, selectedProjectId);
    projectsList.insertAdjacentElement("beforeend", projEl);
  });
}

function createProjectListElement(
  project: Project,
  selectedProjectId: number
): HTMLLIElement {
  const projEl = document.createElement("li");

  projEl.innerText = project.title;
  projEl.dataset.projectId = project.projectId.toString();
  projEl.className =
    selectedProjectId === project.projectId ? "selected-project" : "";

  // delete project button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.className = "delete-project-btn";

  if (project.projectId !== 0) projEl.appendChild(deleteBtn);

  return projEl;
}

export { renderProjectsList };

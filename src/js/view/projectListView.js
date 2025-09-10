const projectsList = document.querySelector(".sidebar__list");

function renderProjectsList(projects, selectedProjectId) {
  // Clean the list, avoid duplicates
  projectsList.innerHTML = "";

  // For each project created, creates  ali element
  projects.forEach((project) => {
    const projEl = createProjectListElement(project, selectedProjectId);
    projectsList.insertAdjacentElement("beforeend", projEl);
  });
}

function createProjectListElement(project, selectedProjectId) {
  const projEl = document.createElement("li");
  projEl.innerText = project.title;
  selectedProjectId;
  projEl.dataset.projectId = project.projectId;
  projEl.className =
    selectedProjectId === project.projectId ? "selected-project" : "";

  return projEl;
}

export { renderProjectsList };

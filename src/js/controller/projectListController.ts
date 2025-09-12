import { saveState, StateParams } from "../model/stateModel";
import { closeModal, showDeleteProjectModal } from "../view/deleteProjectView";
import { updateProjectOptions } from "../view/formsView";
import { renderProjectsList } from "../view/projectListView";
import { closeModalOverlay } from "../view/projectModalView";
import { showToDoList } from "./todoListController";

const projectsList = document.querySelector<HTMLUListElement>(".sidebar__list");
const selectElements =
  document.querySelectorAll<HTMLSelectElement>(".projectId-input");

const modal = document.querySelector<HTMLDivElement>(
  "#delete-project-container"
);
const cancelBtn = modal?.querySelector<HTMLButtonElement>(
  "#close-delete-project"
);
const confirmBtn = modal?.querySelector<HTMLButtonElement>("#delete-project");

export function initProjectListController(state: StateParams) {
  // Renders the projects and items list
  renderProjectsList(state.projectArray, state.selectedProject?.projectId);
  showToDoList();

  if (!projectsList || !cancelBtn || !modal || !confirmBtn) return;

  // -----------------------------
  // 1. Manage selected project
  // -----------------------------
  projectsList.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const li = target.closest("li");
    if (!li) return;

    const projectId = Number(li.dataset.projectId);

    const deleteBtn = target.closest<HTMLButtonElement>(".delete-project-btn");

    // Case: click on delete button
    if (deleteBtn) {
      modal.dataset.projectId = projectId.toString();
      showDeleteProjectModal();
      return;
    }

    // Caso: selezione progetto
    projectsList
      .querySelectorAll("li")
      .forEach((li) => li.classList.remove("selected-project"));

    li.classList.add("selected-project");
    selectElements.forEach((select) => (select.value = projectId.toString()));

    state.selectedProject =
      state.projectArray.find((p) => p.projectId === projectId) ||
      state.projectArray[0];

    showToDoList();
  });

  // -----------------------------
  // 2. Manage confirm delete
  // -----------------------------
  confirmBtn.addEventListener("click", () => {
    const projectToDeleteId = Number(modal.dataset.projectId);
    if (!projectToDeleteId) return;

    if (state.selectedProject.projectId === projectToDeleteId) {
      state.selectedProject = state.projectArray[0];
    }

    state.selectedProject.removeProjectItems(projectToDeleteId);
    state.projectArray = state.projectArray.filter(
      (p) => p.projectId !== projectToDeleteId
    );

    showToDoList();
    renderProjectsList(state.projectArray, state.selectedProject.projectId);
    updateProjectOptions(state.projectArray);
    saveState(state);
    closeModal(modal);
  });

  // -----------------------------
  // 3. Manage cancel/overlay
  // -----------------------------
  cancelBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", closeModalOverlay);
}

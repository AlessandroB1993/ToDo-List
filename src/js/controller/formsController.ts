import { saveState, StateParams } from "../model/stateModel";
import { Item, ItemConstructorParams } from "../model/itemModel";
import { Project } from "../model/projectModel";
import { renderProjectsList } from "../view/projectListView";
import { formatDateForTask } from "../utils/dateHandler";
import { renderChecklistField, updateProjectOptions } from "../view/formsView";
import { showToDoList } from "./todoListController";

const projectForm = document.querySelector<HTMLFormElement>(".project-form");
const inputForm = document.querySelector<HTMLFormElement>("#todo-form");
const checklistForm =
  document.querySelector<HTMLFormElement>("#checklist-form");
const addChecklistItemBtn = document.querySelector<HTMLButtonElement>(
  ".add-checklist-item"
);
const projectModalContainer = document.querySelector<HTMLDivElement>(
  "#project-modal-container"
);

export function initFormsController(state: StateParams) {
  if (
    !projectForm ||
    !inputForm ||
    !checklistForm ||
    !addChecklistItemBtn ||
    !projectModalContainer
  ) {
    console.error("One or more elements of modal are not found at the DOM");
    return;
  }

  const handleProjectSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const formdata = new FormData(projectForm);
    const title = formdata.get("title");

    if (!title || typeof title !== "string") return;

    const newProject = new Project(title);
    state.projectArray.push(newProject);
    saveState(state);

    renderProjectsList(state.projectArray, state.selectedProject?.projectId);
    updateProjectOptions(state.projectArray);

    projectModalContainer.classList.remove("show");
    projectForm.reset();
  };

  const handleItemSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(inputForm);
    const raw = Object.fromEntries(formData.entries());

    const itemData: ItemConstructorParams = {
      title: (raw.title as string) ?? "No title",
      description: (raw.description as string) ?? "No description",
      duedate: raw.duedate ? formatDateForTask(raw.duedate as string) : "None",
      priority: raw.priority === "on",
      projectId: Number(raw.projectId),
      type: state.selectedType,
    };

    // Inserting item to a list and update localStorage
    const listItem = new Item(itemData);
    state.selectedProject?.setItemToList(listItem);
    saveState(state);

    // Updating the DOM
    showToDoList();
  };

  function handleChecklistSubmit(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();

    const formdata = new FormData(form);
    const raw = Object.fromEntries(formdata.entries());
    const tasks: string[] = formdata
      .getAll("task")
      .map((t) => (typeof t === "string" ? t : ""))
      .filter(Boolean);

    const itemData: ItemConstructorParams = {
      title: (raw.title as string) ?? "No title",
      description: (raw.description as string) ?? "No description",
      duedate: raw.duedate ? formatDateForTask(raw.duedate as string) : "None",
      priority: raw.priority === "on",
      projectId: Number(raw.projectId),
      type: state.selectedType,
      tasks: tasks,
    };

    const checklistItem = new Item(itemData);
    state.selectedProject?.setItemToList(checklistItem);

    saveState(state);
    showToDoList();
  }

  projectForm.addEventListener("submit", handleProjectSubmit);
  inputForm.addEventListener("submit", handleItemSubmit);
  checklistForm.addEventListener("submit", (e) =>
    handleChecklistSubmit(e, checklistForm)
  );
  addChecklistItemBtn.addEventListener("click", renderChecklistField);

  updateProjectOptions(state.projectArray);
}

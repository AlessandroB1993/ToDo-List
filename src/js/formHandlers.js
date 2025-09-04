import { updateToDoList } from "./toDoList";
import { state } from "./projectsState";
import { Item, Project } from "./logic";
import { updateProjectsList } from "./projectList";
import {
  inputForm,
  projectModalContainer,
  projectForm,
  selectElements,
  checklistForm,
} from "./domSelecting";
import { formatDateForTask } from "./dateHandler";

// LIST ITEM FORM SUBMITTING
const handleItemSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(inputForm);
  const data = Object.fromEntries(formData.entries());
  data.type = state.selectedType;

  if (data.duedate) {
    data.duedate = formatDateForTask(data.duedate);
  }

  const listItem = new Item(data);
  console.log(listItem);

  // Inserting item to a list
  state.selectedProject.setItemToList(listItem);

  // Updating the DOM
  updateToDoList(state.selectedType);
};

const handleProjectSubmit = (e) => {
  e.preventDefault();

  const formdata = new FormData(projectForm);
  const data = Object.fromEntries(formdata.entries());

  if (!data) return;

  const newSubProject = new Project(data.title);
  state.projectArray.push(newSubProject);

  updateProjectsList();
  updateProjectOptions();

  projectModalContainer.classList.remove("show");
  projectForm.reset();
};

function updateProjectOptions() {
  selectElements.forEach((select) => {
    select.innerHTML = "";

    state.projectArray.forEach((project) => {
      const option = document.createElement("option");
      option.innerText = project.title;
      option.value = project.projectId;

      select.insertAdjacentElement("beforeend", option);
    });
  });
}

// CHECKLIST ITEM SUBMIT
function handleChecklistSubmit(e) {
  e.preventDefault();

  const formdata = new FormData(checklistForm);
  const data = Object.fromEntries(formdata.entries());
  const tasks = formdata.getAll("task").filter((task) => task);
  data.type = state.selectedType;

  if (data.duedate) {
    data.duedate = formatDateForTask(data.duedate);
  }

  const checklistItem = new Item({ ...data, tasks });
  state.selectedProject.setItemToList(checklistItem);

  updateToDoList(state.selectedType);
}

export {
  handleItemSubmit,
  handleProjectSubmit,
  updateProjectOptions,
  handleChecklistSubmit,
};

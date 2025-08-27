import { updateToDoList } from "./toDoList";
import { state } from "./projectsState";
import { Item, Project } from "./logic";
import { updateProjectsList } from "./projectList";
import {
  inputForm,
  projectModalContainer,
  projectForm,
  selectProject,
} from "./domSelecting";

// LIST ITEM FORM SUBMITTING
const handleItemSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(inputForm);
  const data = Object.fromEntries(formData.entries());

  // const formattedDate = data.duedate.split("-").slice(1).join(" ");
  const isPriority = data.priority === "on";
  const dueDate = data.duedate ? data.duedate : "None";

  const listItem = new Item(data);
  console.log(data);

  // Inserting item to a list
  state.selectedProject.setItemToList(listItem);

  // Updating the DOM
  updateToDoList();
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
  selectProject.innerHTML = "";

  state.projectArray.forEach((project) => {
    const option = document.createElement("option");
    option.innerText = project.title;
    option.value = project.projectId;

    selectProject.insertAdjacentElement("beforeend", option);
  });
}

export { handleItemSubmit, handleProjectSubmit, updateProjectOptions };

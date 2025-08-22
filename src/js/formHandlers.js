import { updateToDoList } from "./toDoList";
import { selectedProject } from "./projectsState";
import { Item, Project } from "./logic";

const inputForm = document.getElementById("input-form");

// LIST ITEM FORM SUBMITTING
const handleItemSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(inputForm);
  const data = Object.fromEntries(formData.entries());

  // const formattedDate = data.duedate.split("-").slice(1).join(" ");
  const isPriority = data.priority === "on";
  const dueDate = data.duedate ? data.duedate : "None";

  const listItem = new Item(data);
  console.log(listItem);

  // Select the project corresponding to the selected project id

  // Inserting item to a list
  selectedProject.setItemToList(listItem);

  // Updating the DOM
  updateToDoList();
};

const handleProjectSubmit = (projectArray, e) => {
  e.preventDefault();

  const formdata = new FormData(projectForm);
  const data = Object.fromEntries(formdata.entries());

  if (!data.title.trim()) return;

  const newSubProject = new Project(data.title);
  projectArray.push(newSubProject);

  updateProjectsList();
  // updateProjectOptions();

  modalContainer.classList.remove("show");
  projectForm.reset();
};

export { handleItemSubmit, handleProjectSubmit };

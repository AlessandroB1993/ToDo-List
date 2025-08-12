import { Item, Project, SubProject } from "./logic";
import "./styles.css";

// DOM SELECTING
const title = document.querySelector(".title-input");
const description = document.querySelector(".description-input");
const projectsList = document.querySelector(".sidebar__list");
const toDoList = document.querySelector(".list");
const inputForm = document.getElementById("input-form");
const projectForm = document.querySelector(".project-form");
const addProjectBtn = document.getElementById("add-project");

// PROJECTS LIST
const defaultProject = new Project("default");
const projectArray = [defaultProject];
let selectedProject = defaultProject;

function createDeleteBtn(item) {
  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";

  // Remove item from list and updates the DOM
  deleteBtn.addEventListener("click", () => {
    selectedProject.removeItemFromList(item.id);
    updateToDoList();
  });

  return deleteBtn;
}

function expandItem(e) {
  const listEl = e.target.closest(".list-item");
  if (!listEl || e.target.classList.contains("delete-btn")) return;

  const itemId = listEl.dataset.itemId;

  if (!listEl.classList.contains("extended")) {
    listEl.classList.add("extended");
  }
}

function createListElement(item) {
  const listEl = document.createElement("li");
  const para = document.createElement("p");
  const span = document.createElement("span");
  const deleteBtn = createDeleteBtn(item);

  para.textContent = item.title;
  span.textContent = item.duedate.split("-").slice(1).join(" ");
  deleteBtn.textContent = "X";

  listEl.className = "list-item";
  para.className = "list-item--para";
  span.className = "list-item--span";

  listEl.dataset.itemId = item.id;
  para.appendChild(span);
  listEl.appendChild(para);
  listEl.appendChild(deleteBtn);

  listEl.addEventListener("click", expandItem);

  return listEl;
}

function createProjectListElement(project) {
  const projEl = document.createElement("li");
  projEl.innerText = project.title;
  projEl.dataset.projectId = project.projectId;

  projEl.addEventListener("click", (e) => {
    selectedProject = projectArray.find(
      (project) =>
        project.projectId === Number(e.currentTarget.dataset.projectId)
    );
    updateToDoList();
  });

  return projEl;
}

function updateToDoList() {
  let listItems = [];
  console.log(selectedProject.title);
  if (selectedProject.title === "default") {
    listItems = selectedProject.getAllItems();
  } else {
    // Takes item from selected project's list
    listItems = selectedProject.getSingleListItems();
  }
  console.log(listItems);
  // Clean list
  toDoList.innerHTML = "";

  // For each item, generates a <li> tag with text and deltete btn
  listItems?.forEach((item) => {
    const listEl = createListElement(item);
    // Updates the DOM
    toDoList.insertAdjacentElement("beforeend", listEl);
  });
}

function updateProjectsList() {
  projectsList.innerHTML = "";
  projectArray.forEach((project) => {
    const projElement = createProjectListElement(project);
    projectsList.insertAdjacentElement("beforeend", projElement);
  });
}

// FORM SUBMITTING
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(inputForm);
  const data = Object.fromEntries(formData.entries());

  console.log(data);
  // const formattedDate = data.duedate.split("-").slice(1).join(" ");
  const isPriority = data.priority === "on";

  const newItem = {
    title: data.title,
    description: data.description,
    duedate: data.duedate,
    priority: isPriority,
    type: "notes",
  };

  const listItem = new Item(newItem);

  console.log(selectedProject);
  // Inserting item to a list
  selectedProject.setItemToList({
    ...listItem,
    projectId: selectedProject.projectId,
  });

  // Updating the DOM
  updateToDoList();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData(projectForm);
  const data = Object.fromEntries(formdata.entries());

  const newSubProject = new Project(data.title);
  projectArray.push(newSubProject);

  updateProjectsList();

  projectForm.reset();
});

addProjectBtn.addEventListener("click", () => {
  projectForm.classList.toggle("hidden");
});

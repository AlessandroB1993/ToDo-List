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
const defaultProject = new Project("All items");
const projectArray = [defaultProject];
let selectedProject = defaultProject;

function createDeleteBtn(item) {
  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.innerHTML = "&times;";

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

  const detailsContainer = listEl.querySelector(".details-container");
  const listElements = toDoList.querySelectorAll(".list-item");
  const listElementsArray = Array.from(listElements);

  if (detailsContainer.classList.contains("hidden")) {
    listElementsArray.forEach((el) => {
      const singleContainer = el.querySelector(".details-container");
      singleContainer.classList.add("hidden");
    });

    detailsContainer.classList.remove("hidden");
  } else {
    if (!e.target.classList.contains("priority-btn")) {
      detailsContainer.classList.add("hidden");
    }
  }
}

function createListElement(item) {
  const listEl = document.createElement("li");
  listEl.className = "list-item";
  listEl.dataset.itemId = item.id;

  const deleteBtn = createDeleteBtn(item);

  const markup = `   
                    <div class="list-el-heading">
                      <p class="list-el-title ${
                        item.priority ? "priority-header" : ""
                      }">${item.title}</p>
                      <span class="date">Duedate: ${item.duedate}</span>
                    </div>              
                    <div class='details-container hidden'>
                      <p class="description">${item.description || ""}</p>
              
                      <button class='priority-btn'>${
                        item.priority ? "Remove" : "Set"
                      } priority</button>
                   </div>`;

  listEl.innerHTML = markup;
  const heading = listEl.querySelector(".list-el-heading");
  const priorityBtn = listEl.querySelector(".priority-btn");

  priorityBtn.addEventListener("click", () => {
    item.changePriority();
    updateToDoList();
  });
  listEl.addEventListener("click", expandItem);

  heading.appendChild(deleteBtn);

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
  // Takes all item or from selected project's list
  if (selectedProject.title === "All items") {
    listItems = selectedProject.getAllItems();
  } else {
    listItems = selectedProject.getSingleListItems();
  }

  // Put items with priority === true first
  const withPriority = listItems.filter((i) => i.priority === true);
  const withNoPriority = listItems.filter((i) => i.priority === false);
  const orderedItems = withPriority.concat(withNoPriority);

  console.log(listItems);
  // Clean list
  toDoList.innerHTML = "";

  // For each item, generates a <li> card with delete button, then adds it to list
  orderedItems?.forEach((item) => {
    const listEl = createListElement(item);
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
  const dueDate = data.duedate ? data.duedate : "None";

  const listItem = new Item(data);
  selectedProject.projectId, console.log(selectedProject);

  // Inserting item to a list
  selectedProject.setItemToList(listItem);

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

document.addEventListener("DOMContentLoaded", () => {
  updateProjectsList();
  updateToDoList();
});

import { completedBtn, toDoList } from "./domSelecting";
import { state } from "./projectsState";

function expandItem(e) {
  const listEl = e.target.closest(".list-item");
  if (
    !listEl ||
    e.target.classList.contains("delete-btn") ||
    e.target.classList.contains("task-list-check")
  )
    return;

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

function enableSetCompleteBtn(e, completeBtn) {
  // if target is not check input, return
  if (!e.target.classList.contains("task-list-check")) return;

  // otherwise:
  // 1. select all check inputs in the taskList of the checklist item
  const checkboxes = e.currentTarget.querySelectorAll(".task-list-check");

  // 2. check if all input are checked or not
  console.log(e.target.checked);
  const areAllChecked = Array.from(checkboxes).every((check) => check.checked);

  if (areAllChecked) {
    completeBtn.classList.remove("disabled");
    completeBtn.disabled = false;
  } else {
    completeBtn.classList.add("disabled");
    completeBtn.disabled = true;
  }
}

function createChecklistElement(item) {
  const template = document.getElementById("checklist-item-template");
  const instance = template.content.cloneNode(true);

  const heading = instance.querySelector(".list-el-heading");
  const title = instance.querySelector(".list-el-title");
  const duedate = instance.querySelector(".date");
  const description = instance.querySelector(".description");
  const taskList = instance.querySelector(".task-list");
  const checklistElement = instance.querySelector(".task-list li");
  const priorityBtn = instance.querySelector(".priority-btn");
  const completeBtn = instance.querySelector(".complete-btn");

  title.textContent = item.title;
  duedate.textContent = item.duedate;
  description.textContent = item.description;

  const deleteBtn = createDeleteBtn(item);
  heading.appendChild(deleteBtn);

  taskList.innerHTML = "";
  taskList.addEventListener("click", (e) =>
    enableSetCompleteBtn(e, completeBtn)
  );

  item.checklist.forEach((task) => {
    const listElClone = checklistElement.cloneNode(true);
    const span = document.createElement("span");
    span.textContent = task;

    listElClone.appendChild(span);
    taskList.insertAdjacentElement("beforeend", listElClone);
  });

  const listEl = document.createElement("li");
  listEl.className = "list-item";
  listEl.dataset.itemId = item.id;
  listEl.appendChild(instance);

  priorityBtn.addEventListener("click", () => {
    item.changePriority();
    updateToDoList(state.selectedType);
  });

  completeBtn.addEventListener("click", () => {
    item.setComplete();
    state.selectedProject.addToCompletedList(item);
    updateToDoList(state.selectedType);
  });

  listEl.addEventListener("click", expandItem);

  return listEl;
}

function createListElement(item) {
  const listEl = document.createElement("li");
  listEl.className = "list-item";
  listEl.dataset.itemId = item.id;

  const deleteBtn = createDeleteBtn(item);

  const markup = `<div class="list-el-heading"><p class="list-el-title ${
    item.priority ? "priority-header" : ""
  }">${item.title}</p>
                      <span class="date">Duedate: ${item.duedate}</span>
                    </div>              
                    <div class='details-container hidden'>
                      <p class="description">${item.description}</p>
              
                      <button class='priority-btn'>${
                        item.priority ? "Remove" : "Set"
                      } priority</button>
                      <button class='complete-btn'>Set as completed</button>
                   </div>`;

  listEl.innerHTML = markup;
  const heading = listEl.querySelector(".list-el-heading");
  const priorityBtn = listEl.querySelector(".priority-btn");
  const completeBtn = listEl.querySelector(".complete-btn");

  priorityBtn.addEventListener("click", () => {
    item.changePriority();
    updateToDoList(state.selectedType);
  });

  completeBtn.addEventListener("click", () => {
    item.setComplete();
    state.selectedProject.addToCompletedList(item);
    updateToDoList(state.selectedType);
  });

  listEl.addEventListener("click", expandItem);

  heading.appendChild(deleteBtn);

  return listEl;
}

function createDeleteBtn(item) {
  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.innerHTML = "&times;";

  // Remove item from list and updates the DOM
  deleteBtn.addEventListener("click", () => {
    state.selectedProject.removeItemFromList(item.id);
    updateToDoList(state.selectedType);
  });

  return deleteBtn;
}

function updateToDoList(type) {
  let listItems = [];

  // Takes all item or from selected project's list
  if (state.selectedProject.title === "All items") {
    listItems = state.selectedProject
      .getAllItems()
      .filter((i) => i.type === type);
  } else {
    listItems = state.selectedProject
      .getSingleListItems()
      .filter((i) => i.type === type);
  }

  // Put items with priority === true first
  const withPriority = listItems.filter((i) => i.priority === true);
  const withNoPriority = listItems.filter((i) => i.priority === false);
  const orderedItems = withPriority.concat(withNoPriority);

  // Clean list
  toDoList.innerHTML = "";

  // For each item, generates a <li> card with delete button, then adds it to list
  orderedItems?.forEach((item) => {
    console.log(item.type);
    if (item.type.toLocaleLowerCase() === "item") {
      const listEl = createListElement(item);
      toDoList.insertAdjacentElement("beforeend", listEl);
    } else {
      const listEl = createChecklistElement(item);
      console.log(listEl);
      toDoList.insertAdjacentElement("beforeend", listEl);
    }
  });
}

export { updateToDoList };

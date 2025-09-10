const todoList = document.querySelector(".list");

function renderToDoList(itemsList) {
  // Clean list
  todoList.innerHTML = "";

  // For each item, generates a <li> card with delete button, then adds it to list
  itemsList?.forEach((item) => {
    const listEl =
      item.type.toLowerCase() === "item"
        ? createListElement(item)
        : createChecklistElement(item);

    todoList.insertAdjacentElement("beforeend", listEl);
  });
}

function createListElement(item) {
  const listEl = document.createElement("li");
  listEl.className = "list-item";
  listEl.dataset.itemId = item.id;

  listEl.innerHTML = `
  <div class="list-el-heading">
  <p class="list-el-title ${item.priority ? "priority-header" : ""}">
  ${item.title}
  </p>
  <span class="date">Due date: ${item.duedate}</span>
  </div>              
  <div class="details-container hidden">
      <p class="description">${item.description}</p>
      <button class="priority-btn">${
        item.priority ? "Remove" : "Set"
      } priority</button>
      <button class="complete-btn">Set as completed</button>
      </div>`;

  const heading = listEl.querySelector(".list-el-heading");
  const deleteBtn = createDeleteBtn();
  heading.appendChild(deleteBtn);

  return listEl;
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

  if (item.priority) {
    title.classList.add("priority-header");
    priorityBtn.textContent = "Remove priority";
  }

  title.textContent = item.title;
  duedate.textContent = "Due date: " + item.duedate;
  description.textContent = item.description;

  const deleteBtn = createDeleteBtn(item);
  heading.appendChild(deleteBtn);

  taskList.innerHTML = "";

  item.checklist.forEach((task) => {
    const span = document.createElement("span");
    span.textContent = task;

    const listElClone = checklistElement.cloneNode(true);
    listElClone.appendChild(span);
    taskList.insertAdjacentElement("beforeend", listElClone);
  });

  const listEl = document.createElement("li");
  listEl.className = "list-item";
  listEl.dataset.itemId = item.id;
  listEl.appendChild(instance);

  return listEl;
}

function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.innerHTML = "&times;";

  return deleteBtn;
}

function expandItem(e) {
  const heading = e.target.closest(".list-el-heading");
  if (e.target.classList.contains("delete-button")) return;
  if (!heading) return;

  const listItem = e.target.closest(".list-item");
  const selectedContainer = listItem.querySelector(".details-container");

  // gets all LI elements
  const listElements = Array.from(todoList.querySelectorAll(".list-item"));

  // hide previous expanded item and expands the new selected
  if (selectedContainer.classList.contains("hidden")) {
    listElements.forEach((el) => {
      const singleContainer = el.querySelector(".details-container");
      singleContainer.classList.add("hidden");
    });

    selectedContainer.classList.remove("hidden");
  } else {
    selectedContainer.classList.add("hidden");
  }
}

function enableSetCompleteBtn(e, completeBtn) {
  const taskList = e.target.closest(".task-list");

  // 1. select all check inputs in the taskList of the checklist item
  const checkboxes = taskList.querySelectorAll(".task-list-check");

  // 2. check if all input are checked or not
  const areAllChecked = Array.from(checkboxes).every((check) => check.checked);

  if (areAllChecked) {
    completeBtn.classList.remove("disabled");
    completeBtn.disabled = false;
  } else {
    completeBtn.classList.add("disabled");
    completeBtn.disabled = true;
  }
}
export { renderToDoList, expandItem, enableSetCompleteBtn };

import { Item } from "../model/itemModel";

const todoList = document.querySelector<HTMLUListElement>(".list");

function renderToDoList(itemsList: Item[]): void {
  if (!todoList) return;

  // Clean list
  todoList.innerHTML = "";

  // For each item, generates a <li> card with delete button, then adds it to list
  itemsList?.forEach((item) => {
    const listEl =
      item.type.toLowerCase() === "item"
        ? createListElement(item)
        : createChecklistElement(item);

    if (listEl) todoList.insertAdjacentElement("beforeend", listEl);
  });
}

function createListElement(item: Item): HTMLElement | null {
  const listEl = document.createElement("li");
  listEl.className = "list-item";
  listEl.dataset.itemId = item.id.toString();

  listEl.innerHTML = `
  <div class="list-el-heading">
  <p class="list-el-title ${item.priority ? "priority-header" : ""}">
  ${item.title}
  </p>
  <span class="date">Due date: ${item.duedate}</span>
   <button class="delete-button">&times;</button>
  </div>              
  <div class="details-container hidden">
      <p class="description">${item.description}</p>
      <button class="priority-btn">${
        item.priority ? "Remove" : "Set"
      } priority</button>
      <button class="complete-btn">Set as completed</button>
      </div>`;

  const heading = listEl.querySelector(".list-el-heading");

  if (!heading) return null;

  return listEl;
}

function createChecklistElement(item: Item): HTMLLIElement | null {
  const template = document.querySelector<HTMLTemplateElement>(
    "#checklist-item-template"
  );
  if (!template?.content) return null;

  const instance = template.content.cloneNode(true) as DocumentFragment;

  const listItem = instance.querySelector<HTMLLIElement>(".list-item");
  const heading = instance.querySelector<HTMLDivElement>(".list-el-heading");
  const title = instance.querySelector<HTMLDivElement>(".list-el-title");
  const duedate = instance.querySelector<HTMLSpanElement>(".date");
  const description =
    instance.querySelector<HTMLParagraphElement>(".description");
  const taskList = instance.querySelector<HTMLUListElement>(".task-list");
  const checklistElement =
    instance.querySelector<HTMLLIElement>(".task-list li");
  const priorityBtn =
    instance.querySelector<HTMLButtonElement>(".priority-btn");
  const completeBtn =
    instance.querySelector<HTMLButtonElement>(".complete-btn");
  const deleteBtn = instance.querySelector<HTMLButtonElement>(".delete-button");

  if (
    !listItem ||
    !heading ||
    !title ||
    !duedate ||
    !description ||
    !checklistElement ||
    !taskList ||
    !priorityBtn ||
    !completeBtn ||
    !deleteBtn
  )
    return null;

  title.textContent = item.title;
  duedate.textContent = "Due date: " + item.duedate;
  description.textContent = item.description;
  priorityBtn.textContent = item.priority ? "Remove priority" : "Set priority";

  if (item.priority) title.classList.add("priority-header");

  taskList.innerHTML = "";

  item.checklist.forEach((task) => {
    const span = document.createElement("span");
    span.textContent = task;

    const listElClone = checklistElement.cloneNode(true);
    listElClone.appendChild(span);
    taskList.appendChild(listElClone);
  });

  listItem.dataset.itemId = item.id.toString();

  return listItem;
}

function expandItem(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  if (target.classList.contains("delete-button")) return;

  const heading = target.closest<HTMLDivElement>(".list-el-heading");
  if (!heading || !todoList) return;

  const listItem = target.closest<HTMLLIElement>(".list-item");
  if (!listItem) return;

  const selectedContainer =
    listItem.querySelector<HTMLDivElement>(".details-container");
  if (!selectedContainer) return;

  // gets all LI elements
  const listElements = Array.from(
    todoList.querySelectorAll<HTMLLIElement>(".list-item")
  );

  // hide previous expanded item and expands the new selected
  if (selectedContainer.classList.contains("hidden")) {
    listElements.forEach((el) => {
      const singleContainer =
        el.querySelector<HTMLDivElement>(".details-container");
      singleContainer?.classList.add("hidden");
    });

    selectedContainer.classList.remove("hidden");
  } else {
    selectedContainer.classList.add("hidden");
  }
}

function enableSetCompleteBtn(
  e: MouseEvent,
  completeBtn: HTMLButtonElement
): void {
  const target = e.target as HTMLElement;
  const taskList = target.closest<HTMLUListElement>(".task-list");
  if (!taskList) return;

  // 1. select all check inputs in the taskList of the checklist item
  const checkboxes =
    taskList.querySelectorAll<HTMLInputElement>(".task-list-check");

  // 2. check if all input are checked or not
  const areAllChecked = Array.from(checkboxes).every((check) => check.checked);

  completeBtn.disabled = !areAllChecked;
  completeBtn.classList.toggle("disabled", !areAllChecked);
}
export { renderToDoList, expandItem, enableSetCompleteBtn };

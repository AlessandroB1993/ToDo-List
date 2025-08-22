import { selectedProject } from "./projectsState";

const toDoList = document.querySelector(".list");

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

export { updateToDoList };

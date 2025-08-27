import { completedItemsContainer } from "./domSelecting";
import { state } from "./projectsState";

export function completedItemsHandler() {
  completedItemsContainer.classList.add("show");
  showCompletedItems();
}

export function showCompletedItems() {
  const list = completedItemsContainer.querySelector(".completed-list");
  list.innerHTML = "";
  const completedItems = state.selectedProject.getCompletedItemsList();

  if (completedItems.length === 0) {
    const para = document.createElement("p");
    para.innerText = "No task has been completed yet. Start by creating one.";
    return container.insertAdjacentElement("beforeend", para);
  }

  list.className = "completed-list";

  completedItems.forEach((item) => {
    const listEl = document.createElement("li");
    listEl.innerText = "✔ " + item.title;

    list.insertAdjacentElement("beforeend", listEl);
  });
}

import { completedItemsContainer } from "./domSelecting";
import { state } from "./projectsState";

export function showCompletedItemsModal() {
  completedItemsContainer.classList.add("show");
  completedItemsContainer.classList.remove("hidden");
  showCompletedItems();
}

export function showCompletedItems() {
  const container = completedItemsContainer.querySelector(".container");
  const completedItems = state.selectedProject.getCompletedItemsList();
  const p = container.querySelector("p");

  if (container.contains(p)) {
    container.removeChild(p);
  }

  if (completedItems.length === 0) {
    const para = document.createElement("p");
    para.innerText = "No task has been completed yet. Start by creating one.";
    return container.insertAdjacentElement("beforeend", para);
  }

  const list = completedItemsContainer.querySelector(".completed-list");
  list.innerHTML = "";

  completedItems.forEach((item) => {
    const listEl = document.createElement("li");
    listEl.innerText = "✔ " + item.title;

    list.insertAdjacentElement("beforeend", listEl);
  });
}

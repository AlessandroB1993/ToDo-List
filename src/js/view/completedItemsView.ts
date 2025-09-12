import { Item } from "../model/itemModel";

const modal = document.querySelector<HTMLDivElement>(
  "#completed-items-container"
);
const listContainer = document.querySelector<HTMLDivElement>(
  "#completed-items-container .list-container"
);
const list = document.querySelector<HTMLUListElement>(".completed-list");

export function showCompletedItemsModal() {
  if (!modal) return;
  modal.classList.add("show");
  modal.classList.remove("hidden");
}

function clearMessage() {
  if (!listContainer) return;
  const para = listContainer.querySelector("p");
  if (para) para.remove();
}

export function renderCompletedItems(items: Item[]) {
  if (!list || !listContainer) return;

  // Shows modal and clears averything
  showCompletedItemsModal();
  clearMessage();
  list.innerHTML = "";

  // if completed items do not exist
  if (items.length === 0) {
    const para = document.createElement("p");
    para.innerText = "No task has been completed yet. Start by creating one.";
    listContainer.insertAdjacentElement("beforeend", para);
    return;
  }

  // if they exist, displays it
  items.forEach((item) => {
    const listEl = document.createElement("li");
    listEl.innerText = "✔ " + item.title;
    list.insertAdjacentElement("beforeend", listEl);
  });
}

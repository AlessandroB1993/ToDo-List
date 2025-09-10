const modal = document.getElementById("completed-items-container");
const list = document.querySelector(".completed-list");
const paraContainer = modal.querySelector(".container");

export function showCompletedItemsModal() {
  modal.classList.add("show");
  modal.classList.remove("hidden");
}

function clearMessage() {
  const para = paraContainer.querySelector("p");
  if (para) para.remove();
}

export function renderCompletedItems(items) {
  // Shows modal and clears averything
  showCompletedItemsModal();
  clearMessage();
  list.innerHTML = "";

  // if completed do not exist
  if (items.length === 0) {
    const para = document.createElement("p");
    para.innerText = "No task has been completed yet. Start by creating one.";
    paraContainer.insertAdjacentElement("beforeend", para);
    return;
  }

  // if they exist, displays it
  items.forEach((item) => {
    const listEl = document.createElement("li");
    listEl.innerText = "✔ " + item.title;
    list.insertAdjacentElement("beforeend", listEl);
  });
}

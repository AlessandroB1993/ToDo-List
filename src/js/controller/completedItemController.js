import { renderCompletedItems } from "../view/completedItemsView";
import { closeModal, closeModalOverlay } from "../view/projectModalView";

const completedBtn = document.querySelector(".completed-items-btn");
const closeModalBtn = document.getElementById("close-completed-list");
const completedItemContainer = document.getElementById(
  "completed-items-container"
);

export function initCompletedItemController(state) {
  completedBtn.addEventListener("click", showCompletedItem);
  completedItemContainer.addEventListener("click", closeModalOverlay);
  closeModalBtn.addEventListener("click", () =>
    closeModal(completedItemContainer)
  );

  function showCompletedItem() {
    const completetItem = state.selectedProject.getCompletedItemsList();
    renderCompletedItems(completetItem);
  }
}

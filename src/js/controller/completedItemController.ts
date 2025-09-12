import { StateParams } from "../model/stateModel";
import { renderCompletedItems } from "../view/completedItemsView";
import { closeModal, closeModalOverlay } from "../view/projectModalView";

const completedBtn = document.querySelector<HTMLButtonElement>(
  ".completed-items-btn"
);
const closeModalBtn = document.getElementById(
  "close-completed-list"
) as HTMLButtonElement | null;
const completedItemContainer = document.getElementById(
  "completed-items-container"
) as HTMLDivElement | null;

export function initCompletedItemController(state: StateParams) {
  if (!completedBtn || !completedItemContainer || !closeModalBtn) {
    console.error("One or more elements of modal are not found at the DOM");
    return;
  }

  completedBtn.addEventListener("click", showCompletedItem);
  completedItemContainer.addEventListener("click", closeModalOverlay);
  closeModalBtn.addEventListener("click", () =>
    closeModal(completedItemContainer)
  );

  function showCompletedItem(e: MouseEvent) {
    const completedItems = state.selectedProject?.getCompletedItemsList() ?? [];
    renderCompletedItems(completedItems);
  }
}

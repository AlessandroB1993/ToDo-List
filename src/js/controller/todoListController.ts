import { Item } from "../model/itemModel";
import { getState, saveState, StateParams } from "../model/stateModel";
import {
  enableSetCompleteBtn,
  expandItem,
  renderToDoList,
} from "../view/todoListView";

export function initTodoController(state: StateParams) {
  const todoList = document.querySelector<HTMLUListElement>(".list");
  if (!todoList) return;

  todoList.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const li = target.closest<HTMLLIElement>(".list-item");
    if (!li) return;

    const itemId = Number(li.dataset.itemId);
    if (isNaN(itemId)) return;

    const item: Item | undefined = state.selectedProject?.findItemById(
      Number(itemId)
    );
    if (!item) return;

    // Remove item from list and updates the DOM
    if (target.classList.contains("delete-button")) {
      state.selectedProject?.removeItemFromList(Number(itemId));
      showToDoList();
      saveState(state);
    }

    if (target.classList.contains("priority-btn")) {
      item.changePriority();
      showToDoList();
      saveState(state);
    }

    if (target.classList.contains("complete-btn")) {
      item.setComplete();
      state.selectedProject?.addToCompletedList(item);
      saveState(state);
      showToDoList();
    }

    if (target.closest(".list-el-heading")) {
      expandItem(e);
    }

    if (
      state.selectedType === "checklist" &&
      target.classList.contains("task-list-check")
    ) {
      const completeBtn = li.querySelector<HTMLButtonElement>(".complete-btn");
      enableSetCompleteBtn(e, completeBtn as HTMLButtonElement);
    }
  });
}

function showToDoList() {
  let orderedItems = generateList();
  renderToDoList(orderedItems);
}

function generateList() {
  let listItems = [];
  const state = getState();

  // Takes all item or from selected project's list
  if (state.selectedProject?.title === "All items") {
    listItems = state.selectedProject
      .getAllItems()
      .filter((i) => i.type === state.selectedType);
  } else {
    listItems =
      state.selectedProject
        ?.getSingleListItems()
        .filter((i) => i.type === state.selectedType) ?? [];
  }

  // Put items with priority === true first
  const withPriority = listItems.filter((i) => i.priority === true);
  const withNoPriority = listItems.filter((i) => i.priority === false);
  const orderedItems = withPriority.concat(withNoPriority);

  return orderedItems;
}

export { showToDoList };

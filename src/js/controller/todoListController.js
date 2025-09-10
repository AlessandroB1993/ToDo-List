import { getState, saveState } from "../model/projectsState.js";
import {
  enableSetCompleteBtn,
  expandItem,
  renderToDoList,
} from "../view/todoListView.js";

export function initTodoController(state) {
  const todoList = document.querySelector(".list");

  todoList.addEventListener("click", (e) => {
    const li = e.target.closest(".list-item");
    if (!li) return;

    const itemId = li.dataset.itemId;
    const item = state.selectedProject.findItemById(Number(itemId));

    // Remove item from list and updates the DOM
    if (e.target.classList.contains("delete-button")) {
      state.selectedProject.removeItemFromList(Number(itemId));
      showToDoList();
      saveState(state);
    }

    if (e.target.classList.contains("priority-btn")) {
      item.changePriority();
      showToDoList();
      saveState(state);
    }

    if (e.target.classList.contains("complete-btn")) {
      item.setComplete();
      state.selectedProject.addToCompletedList(item);
      saveState(state);
      showToDoList();
    }

    if (e.target.closest(".list-el-heading")) {
      expandItem(e);
    }

    if (
      state.selectedType === "checklist" &&
      e.target.classList.contains("task-list-check")
    ) {
      const completeBtn = li.querySelector(".complete-btn");
      enableSetCompleteBtn(e, completeBtn);
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
  if (state.selectedProject.title === "All items") {
    listItems = state.selectedProject
      .getAllItems()
      .filter((i) => i.type === state.selectedType);
  } else {
    listItems = state.selectedProject
      .getSingleListItems()
      .filter((i) => i.type === state.selectedType);
  }

  // Put items with priority === true first
  const withPriority = listItems.filter((i) => i.priority === true);
  const withNoPriority = listItems.filter((i) => i.priority === false);
  const orderedItems = withPriority.concat(withNoPriority);

  return orderedItems;
}

export { showToDoList };

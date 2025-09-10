import { initAddProjectController } from "./controller/addProjectController";
import { initCompletedItemController } from "./controller/completedItemController";
import { initFormsController } from "./controller/formsController";
import { initProjectListController } from "./controller/projectListController";
import { initSwitchTypeController } from "./controller/switchTypeController";
import { initTodoController } from "./controller/todoListController";
import "../styles.css";
import { getState } from "./model/projectsState";

// FORM SUBMITTING

// MODALS

// SWITCH FORM

// CLOSE BUTTONS

// FIRST LOADING
// document.addEventListener("DOMContentLoaded", () => {
//   updateProjectsList();
//   updateToDoList(state.selectedType);
//   updateProjectOptions();
// });

function init() {
  const state = getState();

  // starts the controllers
  initAddProjectController(state);
  initTodoController(state);
  initCompletedItemController(state);
  initFormsController(state);
  initProjectListController(state);
  initSwitchTypeController(state);

  // renderProjectsList();
}

init();

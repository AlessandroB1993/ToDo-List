import { initAddProjectController } from "./controller/addProjectController";
import { initCompletedItemController } from "./controller/completedItemController";
import { initFormsController } from "./controller/formsController";
import { initProjectListController } from "./controller/projectListController";
import { initSwitchTypeController } from "./controller/switchTypeController";
import { initTodoController } from "./controller/todoListController";
import "../styles.css";
import { getState } from "./model/stateModel";

function init() {
  // initiate state
  const state = getState();

  // starts the controllers
  initAddProjectController();
  initTodoController(state);
  initCompletedItemController(state);
  initFormsController(state);
  initProjectListController(state);
  initSwitchTypeController(state);
}

init();

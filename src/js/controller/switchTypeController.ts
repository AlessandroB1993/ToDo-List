import { StateParams } from "../model/stateModel";
import { showToDoList } from "./todoListController";

const switchFormContainer = document.querySelector<HTMLDivElement>(
  ".switch-form-container"
);
const checklistForm =
  document.querySelector<HTMLFormElement>("#checklist-form");
const inputForm = document.querySelector<HTMLFormElement>("#todo-form");
const switchButtons =
  document.querySelectorAll<HTMLButtonElement>(".switch-btn");

export function initSwitchTypeController(state: StateParams) {
  if (!switchFormContainer || !inputForm || !checklistForm) return;

  switchFormContainer.addEventListener("click", (e) =>
    handleSwitchForm(e, inputForm, checklistForm)
  );

  function handleSwitchForm(
    e: MouseEvent,
    inputForm: HTMLFormElement,
    checklistForm: HTMLFormElement
  ) {
    const targetBtn = (e.target as HTMLElement).closest("button");

    if (!targetBtn || targetBtn.classList.contains("selected")) return;

    switchButtons.forEach((btn) => btn.classList.remove("selected"));
    targetBtn.classList.add("selected");

    // Update selected type
    state.selectedType = targetBtn.textContent?.toLowerCase() ?? "item";

    // toggles between the two forms
    inputForm.classList.toggle("hidden");
    checklistForm.classList.toggle("hidden");

    showToDoList();
  }
}

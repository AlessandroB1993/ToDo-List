import { checklistForm, inputForm } from "./domSelecting";
import { state } from "./projectsState";
import { updateToDoList } from "./toDoList";

export function handleSwitchForm(e) {
  if (e.target.classList.contains("selected")) return;

  const switchButtons = e.currentTarget.querySelectorAll(".switch-btn");
  switchButtons.forEach((btn) => btn.classList.toggle("selected"));

  const selectedBtn = Array.from(switchButtons).find((btn) =>
    btn.classList.contains("selected")
  );
  state.selectedType = selectedBtn.textContent;

  inputForm.classList.toggle("hidden");
  checklistForm.classList.toggle("hidden");

  updateToDoList(state.selectedType);
}

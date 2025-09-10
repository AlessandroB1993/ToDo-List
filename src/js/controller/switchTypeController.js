import { showToDoList } from "./todoListController";

const switchFormContainer = document.querySelector(".switch-form-container");
const checklistForm = document.getElementById("checklist-form");
const inputForm = document.getElementById("todo-form");
const switchButtons = document.querySelectorAll(".switch-btn");

export function initSwitchTypeController(state) {
  switchFormContainer.addEventListener("click", handleSwitchForm);

  function handleSwitchForm(e) {
    if (e.target.classList.contains("selected")) return;

    switchButtons.forEach((btn) => btn.classList.toggle("selected"));

    // Gets selected btn so type can be selected
    const selectedBtn = Array.from(switchButtons).find((btn) =>
      btn.classList.contains("selected")
    );

    // Update selected type
    state.selectedType = selectedBtn.textContent.toLowerCase();

    // toggles between the two forms
    inputForm.classList.toggle("hidden");
    checklistForm.classList.toggle("hidden");

    showToDoList();
  }
}

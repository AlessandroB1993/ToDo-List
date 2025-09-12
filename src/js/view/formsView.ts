import { Project } from "../model/projectModel";

const selectElements =
  document.querySelectorAll<HTMLSelectElement>(".projectId-input");
const container = document.querySelector<HTMLDivElement>(
  "#checklist-input-container"
);
const checklistItemTemplate =
  document.querySelector<HTMLTemplateElement>("#checklist-item");

export function updateProjectOptions(projArr: Project[]): void {
  selectElements.forEach((select) => {
    select.innerHTML = "";

    projArr.forEach((project) => {
      const option = document.createElement("option");
      option.innerText = project.title;
      option.value = project.projectId.toString();

      select.insertAdjacentElement("beforeend", option);
    });
  });
}

export function renderChecklistField(e: MouseEvent): void {
  if (!checklistItemTemplate || !container) return;

  e.preventDefault();

  const instance = checklistItemTemplate.content.cloneNode(true);

  container.appendChild(instance);
}

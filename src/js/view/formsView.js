const selectElements = document.querySelectorAll(".projectId-input");
const container = document.getElementById("checklist-input-container");
const checklistItemTemplate = document.getElementById("checklist-item");

export function updateProjectOptions(projArr) {
  selectElements.forEach((select) => {
    select.innerHTML = "";

    projArr.forEach((project) => {
      const option = document.createElement("option");
      option.innerText = project.title;
      option.value = project.projectId;

      select.insertAdjacentElement("beforeend", option);
    });
  });
}

export function renderChecklistField(e) {
  e.preventDefault();

  const instance = checklistItemTemplate.content.cloneNode(true);

  container.appendChild(instance);
}

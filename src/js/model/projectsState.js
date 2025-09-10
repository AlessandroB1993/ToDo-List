import { Project } from "./projectModel";
import { Item } from "./itemModel";

function saveState(state) {
  const serializable = {
    projects: state.projectArray.map((p) => p.toJSON()) ?? [],
    items: Project.itemList.map((i) => i.toJSON()),
    completed: Project.completedList.map((i) => i.toJSON()),
    selectedProjectId: state.selectedProject?.projectId ?? null,
    selectedType: state.selectedType,
    projectId: Project.projectId,
  };
  localStorage.setItem("state", JSON.stringify(serializable));
}

function loadState() {
  const cachedState = localStorage.getItem("state");
  if (!cachedState) return null;

  const parsed = JSON.parse(cachedState);

  // reset liste statiche
  Project.itemList = [];
  Project.completedList = [];

  // ricrea gli item
  const itemsById = {};
  parsed.items?.forEach((obj) => {
    const item = new Item(obj);
    itemsById[item.id] = item;
    Project.itemList.push(item);
  });

  parsed.completed?.forEach((obj) => {
    const item = new Item(obj);
    itemsById[item.id] = item;
    Project.completedList.push(item);
  });

  // ricrea i progetti
  const projects = parsed.projects?.map(
    (p) => new Project(p.title, p.projectId)
  );
  Project.projectId = parsed.projectId;

  // seleziona progetto
  const selectedProject = projects[0] || null;

  return {
    projectArray: projects,
    selectedProject,
    selectedType: parsed.selectedType,
  };
}

let state = null;

function initState() {
  const restored = loadState();
  if (restored) return restored;

  // stato di default
  const defaultProject = new Project("All items");
  return {
    projectArray: [defaultProject],
    selectedProject: defaultProject,
    selectedType: "item",
  };
}

function getState() {
  if (!state) {
    state = initState();
  }
  return state;
}

export { getState, saveState, initState };

import { Project } from "./projectModel";
import { Item } from "./itemModel";

export interface StateParams {
  projectArray: Project[];
  selectedProject: Project;
  selectedType: string;
}

interface SerializableState {
  projects: ReturnType<Project["toJSON"]>[];
  items: ReturnType<Item["toJSON"]>[];
  completed: ReturnType<Item["toJSON"]>[];
  selectedProjectId: number | null;
  selectedType: string;
  projectId: number;
  latestId: number;
}

function saveState(state: StateParams): void {
  const serializable: SerializableState = {
    projects: state.projectArray.map((p) => p.toJSON()) ?? [],
    items: Project.itemList.map((i) => i.toJSON()),
    completed: Project.completedList.map((i) => i.toJSON()),
    selectedProjectId: state.selectedProject?.projectId ?? null,
    selectedType: state.selectedType,
    projectId: Project.projectId,
    latestId: Item.latestId,
  };
  localStorage.setItem("state", JSON.stringify(serializable));
}

function loadState(): StateParams | null {
  const cachedState = localStorage.getItem("state");
  if (!cachedState) return null;

  const parsed: SerializableState = JSON.parse(cachedState);

  // reset static lists
  Project.itemList = [];
  Project.completedList = [];

  // re-create items
  parsed.items?.forEach((obj) => {
    const item = new Item(obj);
    Project.itemList.push(item);
  });

  parsed.completed?.forEach((obj) => {
    const item = new Item(obj);
    Project.completedList.push(item);
  });

  // re-create projects
  const projects = parsed.projects?.map(
    (p) => new Project(p.title, p.projectId)
  );

  // restore IDs count
  Project.projectId = parsed.projectId;
  Item.latestId = parsed.latestId;

  //  select 'All items' as selected project
  const selectedProject = projects[0] || null;

  return {
    projectArray: projects,
    selectedProject,
    selectedType: parsed.selectedType,
  };
}

let state: StateParams | null = null;

function initState(): StateParams {
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

function getState(): StateParams {
  if (!state) {
    state = initState();
  }
  return state;
}

export { getState, saveState, initState };

import { Project } from "./logic";

// PROJECTS LIST
const defaultProject = new Project("All items");

export const state = {
  projectArray: [defaultProject],
  selectedProject: defaultProject,
  selectedType: "item",
};

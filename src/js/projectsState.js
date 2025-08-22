import { Project } from "./logic";

// PROJECTS LIST
const defaultProject = new Project("All items");
const projectArray = [defaultProject];
let selectedProject = defaultProject;

export { projectArray, selectedProject };

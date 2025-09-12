import { Item } from "./itemModel";

export class Project {
  static itemList: Item[] = [];
  static completedList: Item[] = [];
  static projectId: number = 0;

  title: string;
  projectId: number;

  constructor(title: string, projectId: number | null = null) {
    this.title = title;
    this.projectId = projectId ?? Project.projectId++;
  }

  toJSON() {
    return {
      title: this.title,
      projectId: this.projectId,
      itemIds: Project.itemList
        .filter((i) => i.projectId === this.projectId)
        .map((i) => i.id),
      completedIds: Project.completedList
        .filter((i) => i.projectId === this.projectId)
        .map((i) => i.id),
    };
  }

  #isEmpty(obj: Record<string, unknown>): boolean {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  isEmptyObject(value: unknown): boolean {
    if (value == null) {
      // null and undefined are not objects, we need to check for actual objects
      return false;
    }

    if (typeof value !== "object") {
      return false;
    }

    return this.#isEmpty(value as Record<string, boolean>);
  }

  // get all items in the list
  getAllItems = (): Item[] => Project.itemList;

  // return items from current selectedProject
  getSingleListItems(): Item[] {
    return Project.itemList.filter((item) => item.projectId === this.projectId);
  }

  setItemToList(item: Item): void {
    if (this.isEmptyObject(item)) return;
    Project.itemList.push(item);
  }

  removeItemFromList = (id: number): void => {
    Project.itemList = Project.itemList.filter((item) => item.id !== id);
  };

  removeProjectItems(projectId: number): void {
    Project.itemList = Project.itemList.filter(
      (i) => i.projectId !== projectId
    );
  }

  getItemDetails = (id: number): Item | undefined => {
    const item = Project.itemList.find((item) => {
      return Number(id) === item.id;
    });
    return item;
  };

  addToCompletedList(item: Item): void {
    Project.completedList.push(item);
    this.removeItemFromList(item.id);
    console.log(Project.completedList);
  }

  getCompletedItemsList(): Item[] {
    return Project.completedList;
  }

  findItemById(itemId: number): Item | undefined {
    return Project.itemList.find((item) => item.id === itemId);
  }
}

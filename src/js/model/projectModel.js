export class Project {
  static itemList = [];
  static completedList = [];
  static projectId = 0;

  constructor(title, projectId = null) {
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

  #isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  isEmptyObject(value) {
    if (value == null) {
      // null and undefined are not objects, we need to check for actual objects
      return false;
    }

    if (typeof value !== "object") {
      return false;
    }

    return this.#isEmpty(value);
  }

  getAllItems = () => Project.itemList;

  getSingleListItems() {
    return Project.itemList.filter((item) => item.projectId === this.projectId);
  }

  setItemToList(item) {
    if (this.isEmptyObject(item)) return;

    Project.itemList.push(item);
  }

  removeItemFromList = (id) => {
    Project.itemList = Project.itemList.filter((item) => item.id !== id);
  };

  getItemDetails = (id) => {
    const item = Project.itemList.find((item) => {
      return Number(id) === item.id;
    });
    return item;
  };

  addToCompletedList(item) {
    Project.completedList.push(item);
    this.removeItemFromList(item.id);
    console.log(Project.completedList);
  }

  getCompletedItemsList() {
    return Project.completedList;
  }

  findItemById(itemId) {
    return Project.itemList.find((item) => item.id === itemId);
  }
}

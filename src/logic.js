export class Item {
  static latestId = 1;
  complete = false;

  constructor({ title, description = "", duedate, priority, type }) {
    this.id = Item.incrementId() - 1;
    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.type = type;
    this.checklist = [];
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }

  changePriority = () => (this.priority = !this.priority);

  setComplete = () => (this.complete = true);
}

export class Project {
  static itemList = [];
  static projectId = 0;

  constructor(title) {
    this.title = title;
    this.projectId = Project.projectId++;
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
}

// export class SubProject extends Project {
//   constructor(title) {
//     super(title);
//     this.subItemList = [];
//   }

//   setItemToList(item) {
//     if (this.isEmptyObject(item)) return;
//     this.subItemList.push(item);
//   }

//   getItemsFromList = () => this.subItemList;

//   removeItemFromList = (id) => {
//     this.subItemList = this.subItemList.filter((item) => item.id !== id);
//   };
// }

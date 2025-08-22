export class Item {
  static latestId = 1;
  complete = false;

  constructor({ title, description, duedate, priority, projectId }) {
    this.id = Item.incrementId() - 1;
    this.title = title;
    this.description = description || "No description";
    this.duedate = duedate || "None";
    this.priority = priority === "on";
    this.projectId = Number(projectId);
    // this.type = type;
    // this.checklist = [];
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }

  changePriority() {
    return (this.priority = !this.priority);
  }

  setComplete = () => (this.complete = true);
}

export class Project {
  static itemList = [
    {
      complete: false,
      description: "retert skdufh sudfhudfhds hfds fhsdufh sud fudhfs d",
      duedate: "2025-08-12",
      id: 1,
      priority: true,
      projectId: 0,
      setComplete: () => (this.complete = true),
      title: "treterkjf",
      type: "notes",
    },
    {
      complete: false,
      description: "retert skdufh sudfhudfhds hfds fhsdufh sud fudhfs d",
      duedate: "2025-08-12",
      id: 1,
      priority: false,
      projectId: 20,
      setComplete: () => (this.complete = true),
      title: "treterkjf",
      type: "notes",
    },
  ];
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

  getItemDetails = (id) => {
    const item = Project.itemList.find((item) => {
      return Number(id) === item.id;
    });
    return item;
  };
}

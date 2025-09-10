export class Item {
  static latestId = 1;
  complete = false;

  constructor({
    id,
    title,
    description,
    duedate,
    priority,
    projectId,
    type,
    tasks,
  }) {
    this.id = id ?? Item.incrementId() - 1;
    this.title = title || "No title";
    this.description = description || "No description";
    this.duedate = duedate || "None";
    this.priority = priority === "on";
    this.projectId = Number(projectId);
    this.type = type;
    this.checklist = tasks || [];
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      duedate: this.duedate,
      priority: this.priority,
      projectId: this.projectId,
      type: this.type,
      tasks: this.checklist,
      complete: this.complete,
    };
  }

  changePriority() {
    return (this.priority = !this.priority);
  }

  setComplete() {
    this.complete = true;
  }
}

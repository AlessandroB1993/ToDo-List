export interface ItemConstructorParams {
  id?: number;
  title?: string;
  description?: string;
  duedate?: string;
  priority?: boolean | string;
  projectId: number;
  type: string;
  tasks?: string[];
}

export class Item {
  static latestId = 1;

  id: number;
  title: string;
  description: string;
  duedate: string;
  priority: boolean;
  projectId: number;
  type: string;
  checklist: string[];
  complete: boolean = false;

  constructor({
    id,
    title,
    description,
    duedate,
    priority,
    projectId,
    type,
    tasks,
  }: ItemConstructorParams) {
    this.id = id ?? Item.incrementId() - 1;
    this.title = title || "No title";
    this.description = description || "No description";
    this.duedate = duedate || "None";
    this.priority = priority === "on" || priority === true;
    this.projectId = Number(projectId);
    this.type = type;
    this.checklist = tasks || [];
  }

  static incrementId(): number {
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

  changePriority(): boolean {
    console.log(this.id, this.title);
    return (this.priority = !this.priority);
  }

  setComplete(): void {
    this.complete = true;
  }
}

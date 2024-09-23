export interface IProject {
  _id: string;
  name: string;
  ownerId: string;
  users: string[];
  tasks: string[];
  createdAt: string;
}

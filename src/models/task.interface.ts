export interface ITask {
  _id: string;
  name: string;
  description: string;
  status: string;
  projectId: string;
  userId: string;
  history: string[{
    status: string;
    timestamp: string;
  }];
  createdAt: string;
}

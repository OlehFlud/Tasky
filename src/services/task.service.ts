import { taskRepository } from '../repositories';
import { ITask } from '../models';

class TaskService {
  async createTask(task: ITask): Promise<ITask> {
    return await taskRepository.createTask(task);
  }

  updateTaskAndAddHistoryByParams(params: Partial<ITask>, update: Partial<ITask>) {
    return taskRepository.updateTaskAndAddHistoryByParams(params, update);
  }

  updateTaskByParams(params: Partial<ITask>, update: Partial<ITask>) {
    return taskRepository.updateTaskByParams(params, update);
  }

  async findOneByParams(findObject: Partial<ITask>) {
    return await taskRepository.findTaskByParams(findObject);
  }

  async deleteTaskByParams(findObject: Partial<ITask>) {
    return await taskRepository.deleteTaskByParams(findObject);
  }
}

export const taskService = new TaskService();

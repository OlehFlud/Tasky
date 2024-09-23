import { TaskModel } from '../dataBase';
import { ITask } from '../models';

export class TaskRepository {
  createTask(task: ITask): Promise<ITask> {
    const taskToCreate = new TaskModel(task);

    return taskToCreate.save();
  }

  updateTaskByParams(params: Partial<ITask>, update: Partial<ITask>) {
    return TaskModel.findOneAndUpdate(params, update, { new: true });
  }

  updateTaskAndAddHistoryByParams(params: Partial<ITask>, update: Partial<ITask>) {
    return TaskModel.findOneAndUpdate(
      params,
      {
        ...update,
        $push: {
          history: {
            status: update.status,
            timestamps: new Date(),
          },
        },
      },
      { new: true },
    );
  }

  async findTaskByParams(findObject: Partial<ITask>) {
    return await TaskModel.findOne(findObject);
  }

  async deleteTaskByParams(findObject: Partial<ITask>) {
    return await TaskModel.findOneAndDelete(findObject);
  }
}

export const taskRepository = new TaskRepository();

import { Types } from 'mongoose';

import { ProjectModel } from '../dataBase';
import { IProject } from '../models';

export class ProjectRepository {
  async createProject(project: IProject): Promise<IProject> {
    const projectToCreate = new ProjectModel(project);

    return await projectToCreate.save();
  }

  async addTaskToProjectById(projectId: string, taskId: string): Promise<IProject | null> {
    return await ProjectModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(projectId) },
      {
        $push: {
          tasks: taskId,
        },
      },
    );
  }

  async deleteTaskFromProjectById(projectId: string, taskId: string): Promise<IProject | null> {
    return await ProjectModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(projectId) },
      {
        $pull: {
          tasks: taskId,
        },
      },
    );
  }

  addUserToProjectById(projectId: string, userId: string) {
    return ProjectModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(projectId) },
      {
        $push: {
          users: userId,
        },
      },
      {new:true}
    );
  }
  async findProjectByParams(params: Partial<IProject>): Promise<IProject | null> {
    return await ProjectModel.findOne(params);
  }

  async findProjectByUserId(userId: string) {
    return await ProjectModel.find({ users: new Types.ObjectId(userId) });
  }

  async findProjectById(projectId: string) {
    return await ProjectModel.findById(new Types.ObjectId(projectId));
  }
}

export const projectRepository = new ProjectRepository();

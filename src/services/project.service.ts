import { projectRepository } from '../repositories';
import { IProject } from '../models';

class ProjectService {
  async createProject(project: IProject): Promise<IProject> {
    return await projectRepository.createProject(project);
  }

  async addTaskToProjectById(projectId: string, taskId: string): Promise<IProject | null> {
    return await projectRepository.addTaskToProjectById(projectId, taskId);
  }

  async deleteTaskFromProjectById(projectId: string, taskId: string): Promise<IProject | null> {
    return await projectRepository.deleteTaskFromProjectById(projectId, taskId);
  }

  addUserToProject(projectId: string, userId: string): Promise<IProject | null> {
    return projectRepository.addUserToProjectById(projectId, userId);
  }

  async findProjectById(projectId: string): Promise<IProject | null> {
    return await projectRepository.findProjectById(projectId);
  }

  async findProjectByParams(params: Partial<IProject>): Promise<IProject | null> {
    return await projectRepository.findProjectByParams(params);
  }

  async findProjectsByUserId(userId: string): Promise<IProject[]> {
    return await projectRepository.findProjectByUserId(userId);
  }
}

export const projectService = new ProjectService();

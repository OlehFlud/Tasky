import { NextFunction, Request, Response } from 'express';

import { EventEnum } from '../constants';
import { IRequestExtended, IUser } from '../models';
import { projectService, taskService } from '../services';
import { socketService } from '../index';
import { IProject, ITask } from '../models';

class ProjectController {
  async creteProject(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
    try {
      const { _id } = req.user as IUser;
      const project = req.body as IProject;
      const newProject = await projectService.createProject({
        ...project,
        ownerId: _id,
      });
      res.send({ project: newProject });
    } catch (e) {
      next(e);
    }
  }

  async findProjectsByUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;
      const projects = await projectService.findProjectsByUserId(_id);
      res.send({ projects });
    } catch (e) {
      next(e);
    }
  }

  async findProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;

      const project = await projectService.findProjectById(projectId);

      res.send({ project });
    } catch (e) {
      next(e);
    }
  }

  async inviteUserToProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, userId } = req.params;

      const project = await projectService.addUserToProject(projectId, userId);

      res.send({ project });
    } catch (e) {
      next(e);
    }
  }

  async creteTaskByProjectId(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const task = req.body;
      const newTask = await taskService.createTask({
        ...task,
        projectId,
      });
      await projectService.addTaskToProjectById(projectId, newTask._id);
      await socketService.emitEvent(EventEnum.TASK_CREATED, newTask?.name);
      res.send({ task });
    } catch (e) {
      next(e);
    }
  }

  async updateTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      const params = req.body as Partial<ITask>;
      const { status } = req.body;
      let task: ITask | null;

      if (status) {
        task = await taskService.updateTaskAndAddHistoryByParams({ _id: taskId }, params);
        await socketService.emitEvent(EventEnum.TASK_MOVED, task?.name);
        await socketService.emitEvent(EventEnum.TASK_UPDATED, task?.name);
      } else {
        task = await taskService.updateTaskByParams({ _id: taskId }, params);
        await socketService.emitEvent(EventEnum.TASK_UPDATED, task?.name);
      }
      res.send({ task });
    } catch (e) {
      next(e);
    }
  }

  async deleteTaskByProjectId(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, taskId } = req.params;

      await projectService.deleteTaskFromProjectById(projectId,taskId)
      const task = await taskService.deleteTaskByParams({projectId});
      res.send({ task });
    } catch (e) {
      next(e);
    }
  }
}

export const projectController = new ProjectController();

import { Router } from 'express';

import { projectController } from '../controllers';

import {
  checkIsUserBelongsToProjectMiddleware,
  checkIsTaskBelongsToProjectMiddleware,
  newProjectValidatorMiddleware,
  checkIsProjectExistMiddleware,
  updateTaskValidatorMiddleware,
  checkAccessTokenMiddleware,
  checkIsTaskExistMiddleware,
  newTaskValidatorMiddleware,
} from '../middleware';

const router = Router();

router.post('/', checkAccessTokenMiddleware, newProjectValidatorMiddleware, projectController.creteProject);

router.get('/', checkAccessTokenMiddleware, projectController.findProjectsByUser);

router.post(
  '/:projectId/invite/:userId',
  checkAccessTokenMiddleware,
  checkIsProjectExistMiddleware,
  checkIsUserBelongsToProjectMiddleware,
  projectController.inviteUserToProject,
);

router.get('/:projectId', projectController.findProjectById);

router.post(
  '/:projectId/tasks',
  checkAccessTokenMiddleware,
  checkIsProjectExistMiddleware,
  newTaskValidatorMiddleware,
  projectController.creteTaskByProjectId,
);

router.put(
  '/:projectId/tasks/:taskId',
  checkAccessTokenMiddleware,
  checkIsProjectExistMiddleware,
  checkIsTaskExistMiddleware,
  checkIsTaskBelongsToProjectMiddleware,
  updateTaskValidatorMiddleware,
  projectController.updateTaskById,
);

router.delete(
  '/:projectId/tasks/:taskId',
  checkAccessTokenMiddleware,
  checkIsProjectExistMiddleware,
  checkIsTaskExistMiddleware,
  checkIsTaskBelongsToProjectMiddleware,
  projectController.deleteTaskByProjectId,
);

export const projectRouter = router;

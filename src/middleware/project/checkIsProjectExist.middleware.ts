import { NextFunction, Response } from 'express';

import { ResponceStatusCodeEnum } from '../../constants';
import { CustomErrors, ErrorHandler } from '../../errors';
import { projectService } from '../../services';

export const checkIsProjectExistMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { projectId } = req.params;
  const project = await projectService.findProjectByParams({ _id: projectId });
  if (!project) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.NOT_FOUND, CustomErrors.NOT_FOUND.message));
  }
  req.project = project;
  next();
};

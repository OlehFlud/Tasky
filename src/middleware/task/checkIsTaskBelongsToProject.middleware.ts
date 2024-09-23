import { NextFunction, Response } from 'express';

import { CustomErrors, ErrorHandler } from '../../errors';
import { ResponceStatusCodeEnum } from '../../constants';

export const checkIsTaskBelongsToProjectMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { project } = req;
  const { taskId } = req.params;
  const isIncluded = project?.tasks?.includes(taskId);

  if (!isIncluded) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.NOT_FOUND, CustomErrors.TASK_IN_PROJECT_NOT_FOUND.message));
  }
  next();
};

import { NextFunction, Response } from 'express';

import { CustomErrors, ErrorHandler } from '../../errors';
import { ResponceStatusCodeEnum } from '../../constants';
import { taskService } from '../../services';

export const checkIsTaskExistMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { taskId } = req.params;
  const task = await taskService.findOneByParams({ _id: taskId });
  if (!task) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.NOT_FOUND, CustomErrors.NOT_FOUND.message));
  }
  req.task = await task;
  next();
};

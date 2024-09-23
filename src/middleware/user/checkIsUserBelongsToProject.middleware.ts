import { NextFunction, Response } from 'express';

import { CustomErrors, ErrorHandler } from '../../errors';
import { ResponceStatusCodeEnum } from '../../constants';

export const checkIsUserBelongsToProjectMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { project } = req;
  const { userId } = req.params;
  const isIncluded = project?.users?.includes(userId);

  if (isIncluded) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.FORBIDDEN, CustomErrors.USER_IN_PROJECT_PRESENT.message));
  }
  next();
};

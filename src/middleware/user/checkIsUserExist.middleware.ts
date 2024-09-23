import { NextFunction, Response } from 'express';

import { CustomErrors, ErrorHandler } from '../../errors';
import { ResponceStatusCodeEnum } from '../../constants';
import { userService } from '../../services';
import { IUser } from '../../models';

export const checkIsUserExistMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  const { login } = req.body as Partial<IUser>;
  const userByLogin = await userService.findUserByParams({ login });

  if (!userByLogin) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.NOT_FOUND, CustomErrors.NOT_FOUND.message));
  }
  req.user = await userByLogin;
  next();
};

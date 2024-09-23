import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { newUserValidator } from '../../validators';
import { ErrorHandler } from '../../errors';
import { IUser } from '../../models';

export const checkIsUserValidityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as IUser;

  const { error } = newUserValidator.validate(user);

  if (error) {
    return next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.details[0].message));
  }

  next();
};

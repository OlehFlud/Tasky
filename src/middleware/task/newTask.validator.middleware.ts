import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { newTaskValidator } from '../../validators';
import { ErrorHandler } from '../../errors';

export const newTaskValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = newTaskValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.details[0].message));
  }

  next();
};

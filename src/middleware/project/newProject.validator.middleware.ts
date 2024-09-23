import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { newProjectValidator } from '../../validators';
import { ErrorHandler } from '../../errors';

export const newProjectValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = newProjectValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.details[0].message));
  }

  next();
};

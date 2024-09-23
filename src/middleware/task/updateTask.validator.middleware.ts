import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { updateTaskValidator } from '../../validators';
import { ErrorHandler } from '../../errors';

export const updateTaskValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateTaskValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(StatusCodes.BAD_REQUEST, error.details[0].message));
  }

  next();
};

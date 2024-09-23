import { NextFunction, Request, Response } from 'express';

import { singlePasswordValidator } from '../../validators';
import { ResponceStatusCodeEnum } from '../../constants';
import { ErrorHandler } from '../../errors';

export const singlePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = singlePasswordValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};

import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomErrors, ErrorHandler } from '../../errors';
import { accessTokenService } from '../../services';
import { IRequestExtended } from '../../models';
import { tokenVerificator } from '../../helpers';
import { ActionEnum } from '../../constants';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const token = req.get?.('Authorization');

    if (!token) {
      return next(new ErrorHandler(StatusCodes.BAD_REQUEST, CustomErrors.BAD_REQUEST_NO_TOKEN.message));
    }
    await tokenVerificator(ActionEnum.USER_REGISTER, token);

    const userByToken = await accessTokenService.findAccessTokenByParams({ accessToken: token });

    if (!userByToken) {
      return next(new ErrorHandler(StatusCodes.NOT_FOUND, CustomErrors.NOT_FOUND.message));
    }
    req.user = userByToken as any;
    next();
  } catch (e) {
    next(e);
  }
};

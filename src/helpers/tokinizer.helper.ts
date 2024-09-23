import * as jwt from 'jsonwebtoken';

import { ActionEnum, ResponceStatusCodeEnum } from '../constants';
import { ErrorHandler } from '../errors';
import { config } from '../config';

export const tokinizer = (action: ActionEnum): { accessToken: string; refreshToken: string } => {
  let accessToken = '';
  let refreshToken = '';

  switch (action) {
    case ActionEnum.USER_REGISTER:
      accessToken = jwt.sign({}, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME });
      refreshToken = jwt.sign({}, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_LIFETIME });
      break;
    default:
      throw new ErrorHandler(ResponceStatusCodeEnum.SERVER, 'wrong action');
  }

  return {
    accessToken,
    refreshToken,
  };
};

import { ActionEnum, ResponceStatusCodeEnum } from '../constants';
import { ErrorHandler } from '../errors';
import { config } from '../config';

import { verify } from 'jsonwebtoken';

export const tokenVerificator = async (action: ActionEnum, token: string): Promise<boolean> => {
  let secret = '';

  switch (action) {
    case ActionEnum.USER_REGISTER:
      secret = config.JWT_CONFIRM_EMAIL_SECRET;
      break;
    case ActionEnum.FORGOT_PASSWORD:
      secret = config.JWT_PASS_FORGOT_SECRET;
      break;
    default:
      throw new ErrorHandler(ResponceStatusCodeEnum.SERVER, 'Wrong action');
  }

  try {
    const decoded = await verify(token, secret);

    return !!decoded; // Return true if valid, false otherwise
  } catch (err) {
    // If verification fails, return false
    return false;
  }
};

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { comparePassword, hashPassword, tokinizer } from '../helpers';
import { accessTokenService, userService } from '../services';
import { CustomErrors, ErrorHandler } from '../errors';
import { ActionEnum } from '../constants';
import { IUser } from '../models';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUser;

      user.password = await hashPassword(user.password);

      const newUser = await userService.createUser(user);

      res.send({ user: newUser });
    } catch (e) {
      next(e);
    }
  }

  async loginUser(req: any, res: Response, next: NextFunction) {
    try {
      const { password, _id } = req.user;
      const authInfo = req.body;
      const isPasswordEquals = await comparePassword(authInfo.password, password);

      if (!isPasswordEquals) {
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, CustomErrors.NOT_FOUND.message));
      }

      const { accessToken, refreshToken } = tokinizer(ActionEnum.USER_REGISTER);

      await accessTokenService.createTokenPair({
        accessToken,
        refreshToken,
        userId: _id,
      });

      res.json({ accessToken, refreshToken });
    } catch (e) {
      next(e);
    }
  }

  async logoutUser(req: any, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get('Authorization');

      if (!accessToken) {
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, CustomErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      await accessTokenService.removeToken({ accessToken });

      res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  }

  async findUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.findUserByParams({ _id: id });
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();

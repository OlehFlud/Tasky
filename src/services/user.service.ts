import { UserModel } from '../dataBase';
import { IUser } from '../models';

class UserService {
  createUser(user: Partial<IUser>): Promise<IUser> {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  updateUserByParams(params: Partial<IUser>, update: Partial<IUser>): Promise<IUser> {
    return UserModel.updateOne(params, update) as any;
  }

  findUserByParams(findObject: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOne(findObject).select('-password') as any;
  }
}

export const userService = new UserService();

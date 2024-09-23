import { UserModel } from '../dataBase';
import { IUser } from '../models';

export class UserRepository {
  createUser(user: IUser): Promise<IUser> {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  updateUserByParams(params: Partial<IUser>, update: Partial<IUser>) {
    return UserModel.updateOne(params, update);
  }

  async findUserByParams(findObject: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findOne(findObject);
  }
}

export const userRepository = new UserRepository();

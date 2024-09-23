import { Document, Model, model, Schema } from 'mongoose';

import { IUser } from '../../models';
import { TableNamesEnum } from '../../constants';

export type UserType = IUser & Document;

export const UserSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel: Model<UserType> = model<UserType>(TableNamesEnum.USER, UserSchema);

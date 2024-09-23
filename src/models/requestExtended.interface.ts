import { Request } from 'express';
import { IUser } from './user.interface';

export interface IRequestExtended extends Partial<Request> {
  user?: IUser;
}

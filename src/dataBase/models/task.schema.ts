import { Document, Model, model, Schema } from 'mongoose';

import { ITask } from '../../models';
import { TableNamesEnum, UserRoleEnum } from '../../constants';

export type TaskType = ITask & Document;

export const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      default: UserRoleEnum.USER,
    },
    history: [],
  },
  {
    timestamps: true,
  },
);

export const TaskModel: Model<TaskType> = model<TaskType>(TableNamesEnum.TASK, TaskSchema);

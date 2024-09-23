import { Document, Model, model, Schema } from 'mongoose';

import { IProject } from '../../models';
import { TableNamesEnum } from '../../constants';

export type ProjectType = IProject & Document;

export const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      ref: TableNamesEnum.USER,
    },
    users: [
      {
        type: String,
        ref: TableNamesEnum.USER,
        required: false,
      },
    ],
    tasks: [
      {
        type: String,
        ref: TableNamesEnum.TASK,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ProjectModel: Model<ProjectType> = model<ProjectType>(TableNamesEnum.PROJECT, ProjectSchema);

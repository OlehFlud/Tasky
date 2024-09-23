import * as Joi from 'joi';

export const newTaskValidator = Joi.object({
  name: Joi.string().trim().min(2).max(60).required(),
  description: Joi.string().trim().min(2).max(60).required(),
  status: Joi.string().trim().valid('TODO', 'In Progress', 'Done'),
  userId: Joi.string().required(),
});

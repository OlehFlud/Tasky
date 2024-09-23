import * as Joi from 'joi';

export const updateTaskValidator = Joi.object({
  name: Joi.string().trim().min(2).max(60),
  description: Joi.string().trim().min(2).max(60),
  status: Joi.string().trim().valid('TODO', 'In Progress', 'Done'),
});

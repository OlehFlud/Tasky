import * as Joi from 'joi';

export const newProjectValidator = Joi.object({
  name: Joi.string().trim().min(2).max(60).required(),
});

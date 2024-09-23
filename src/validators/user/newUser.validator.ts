import * as Joi from 'joi';

import { regexp } from '../../constants';

export const newUserValidator = Joi.object({
  login: Joi.string().min(1).max(120).required(),
  name: Joi.string().trim().min(2).max(60).required(),
  password: Joi.string().trim().regex(regexp.password).required(),
});

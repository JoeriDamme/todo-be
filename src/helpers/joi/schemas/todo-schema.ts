import Joi from 'joi';

export const todoSchema = Joi.object({
  completed: Joi.boolean(),
  description: Joi.string().min(1).max(120).required(),
});

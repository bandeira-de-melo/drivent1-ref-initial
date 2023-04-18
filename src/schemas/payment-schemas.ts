import Joi from 'joi';

export const ticketIdSchema = Joi.object({
  ticketId: Joi.string().min(1).required(),
});

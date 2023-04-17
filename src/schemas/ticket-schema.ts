import Joi from 'joi';

export const postTicketSchema = Joi.object({
  ticketTypeId: Joi.number().min(1).required(),
});

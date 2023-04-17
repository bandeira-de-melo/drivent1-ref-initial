import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketTypes, getUserTicket, postTicket } from '@/controllers';
import { postTicketSchema } from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getUserTicket)
  .post('/', validateBody(postTicketSchema), postTicket);

export { ticketsRouter };

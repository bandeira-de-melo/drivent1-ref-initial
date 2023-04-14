import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const userTicket = await ticketsService.getUserTicket(userId);
    return res.status(200).send(userTicket);
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

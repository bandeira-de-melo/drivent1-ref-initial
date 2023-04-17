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
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body.ticketTypeId as number;
  const userId = req.userId as number;
  try {
    const ticket = await ticketsService.postTicket(ticketTypeId, userId);
    res.status(201).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).send(httpStatus.NOT_FOUND);
    }
  }
}

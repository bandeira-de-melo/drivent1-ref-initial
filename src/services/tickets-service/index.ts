import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/tickets-repository';
import { notFoundError, requestError } from '@/errors';

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketRepository.getTicketTypes();
  if (ticketTypes.length < 1) return [];
  return ticketTypes;
}

async function getUserTicket(userId: number) {
  const isUserErroled = await ticketRepository.getUserErrolment(userId);
  if (!isUserErroled) throw notFoundError();
  const userTicket = await ticketRepository.getUserTicket(isUserErroled.id);
  if (!userTicket) throw notFoundError();
  return userTicket;
}

async function postTicket(ticketTypeId: number, userId: number) {
  const ticketTId = ticketTypeId;
  if (!ticketTId) throw requestError(400, 'Must provide a ticketTypeId');

  const isUserErroled = await ticketRepository.getUserErrolment(userId);
  if (!isUserErroled) throw notFoundError();

  const tickectCreated = await ticketRepository.postTicket(ticketTId, isUserErroled.id);
  return ticketRepository.getReservedTicket(tickectCreated.id);
}

const ticketsService = {
  getTicketTypes,
  getUserTicket,
  postTicket,
};

export default ticketsService;

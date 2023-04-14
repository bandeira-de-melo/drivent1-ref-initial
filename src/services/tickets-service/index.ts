import { Enrollment, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';

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
}

const ticketsService = {
  getTicketTypes,
  getUserTicket,
};

export default ticketsService;

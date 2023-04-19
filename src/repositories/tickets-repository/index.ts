import { Enrollment, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes() {
  return await prisma.ticketType.findMany({});
}

async function getUserErrolment(userId: number): Promise<Enrollment> {
  return await prisma.enrollment.findFirst({ where: { userId } });
}

async function getUserTicket(enrollmentId: number): Promise<Ticket | TicketType> {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function getTicketType(ticketTypeId: number): Promise<TicketType> {
  const ticketTId = ticketTypeId;
  return await prisma.ticketType.findFirst({ where: { id: ticketTId } });
}

async function postTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
  return await prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      updatedAt: new Date().toISOString(),
    },
  });
}

async function getReservedTicket(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  getTicketTypes,
  getUserErrolment,
  getUserTicket,
  postTicket,
  getTicketType,
  getReservedTicket,
};

export default ticketRepository;

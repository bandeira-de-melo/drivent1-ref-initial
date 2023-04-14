import { Enrollment, Ticket, TicketType } from '@prisma/client';
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

const ticketRepository = {
  getTicketTypes,
  getUserErrolment,
  getUserTicket,
};

export default ticketRepository;

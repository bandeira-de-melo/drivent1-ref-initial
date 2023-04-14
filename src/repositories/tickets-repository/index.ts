import { prisma } from '@/config';

async function getTicketTypes() {
  return await prisma.ticketType.findMany({});
}

const ticketRepository = {
  getTicketTypes,
};

export default ticketRepository;

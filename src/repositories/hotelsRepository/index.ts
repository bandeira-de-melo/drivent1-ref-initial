import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { HotelWithRoomsType, hotelResponseType } from '@/protocols';

export async function getHotelsList(): Promise<hotelResponseType[]> {
  return await prisma.hotel.findMany();
}
export async function getUserTicket(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({ where: { enrollmentId } });
}

export async function getUserTicketType(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

export async function getHotelWithRooms(hotelId: number): Promise<HotelWithRoomsType> {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    select: {
      id: true,
      name: true,
      image: true,
      Rooms: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const hotelsRepository = {
  getHotelsList,
  getHotelWithRooms,
  getUserTicket,
  getUserTicketType,
};

export default hotelsRepository;

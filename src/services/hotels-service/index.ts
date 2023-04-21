import ticketsService from '../tickets-service';
import { paymentRequiredError } from '@/errors/payment-required-error';
import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotelsRepository';
import { Hotel } from '@/protocols';
import { prisma } from '@/config';

export async function getHotelsList(userId: number) {
  const ticketInfo = await ticketsService.getUserTicket(userId);
  if (!ticketInfo) throw notFoundError();

  if (
    ticketInfo.status !== 'PAID' ||
    ticketInfo.TicketType.isRemote === true ||
    ticketInfo.TicketType.includesHotel === false
  ) {
    throw paymentRequiredError();
  }
  return await hotelsRepository.getHotelsList();
}

export async function getHotelAndRoomsByHotelId(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

export async function createHotelsList(hotelData: Omit<Hotel, 'id'>) {
  return await prisma.hotel.createMany({
    data: hotelData,
  });
}

const hotelsService = {
  getHotelsList,
  createHotelsList,
  getHotelAndRoomsByHotelId,
};

export default hotelsService;

import { Ticket } from '@prisma/client';
import ticketsService from '../tickets-service';
import { paymentRequiredError } from '@/errors/payment-required-error';
import { notFoundError } from '@/errors';
import hotelsRepository, { getHotelWithRooms } from '@/repositories/hotelsRepository';
import { prisma } from '@/config';
import enrollmentRepository from '@/repositories/enrollment-repository';

export async function getHotelsList(userId: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) throw notFoundError();

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

export async function getHotelAndRoomsByHotelId(hotelId: number, userId: number) {
  const ticketInfo = await ticketsService.getUserTicket(userId);
  if (!ticketInfo) throw notFoundError();

  if (
    ticketInfo.status !== 'PAID' ||
    ticketInfo.TicketType.isRemote === true ||
    ticketInfo.TicketType.includesHotel === false
  ) {
    throw paymentRequiredError();
  }
  return await hotelsRepository.getHotelWithRooms(hotelId);
}

const hotelsService = {
  getHotelsList,
  getHotelAndRoomsByHotelId,
};

export default hotelsService;

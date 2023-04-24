import { paymentRequiredError } from '@/errors/payment-required-error';
import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotelsRepository';
import enrollmentRepository from '@/repositories/enrollment-repository';

export async function getHotelsList(userId: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) throw notFoundError();

  const ticketInfo = await hotelsRepository.getUserTicket(userEnrollment.id);
  if (!ticketInfo) throw notFoundError();

  const ticketTypeInfo = await hotelsRepository.getUserTicketType(ticketInfo.ticketTypeId);
  if (ticketInfo.status !== 'PAID') throw paymentRequiredError();
  if (ticketTypeInfo.isRemote === true) paymentRequiredError();
  if (ticketTypeInfo.includesHotel === false) paymentRequiredError();
  return await hotelsRepository.getHotelsList();
}

export async function getHotelAndRoomsByHotelId(hotelId: number, userId: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) throw notFoundError();

  const ticketInfo = await hotelsRepository.getUserTicket(userEnrollment.id);
  if (!ticketInfo) throw notFoundError();

  const ticketTypeInfo = await hotelsRepository.getUserTicketType(ticketInfo.ticketTypeId);

  if (ticketInfo.status !== 'PAID') throw paymentRequiredError();
  if (ticketTypeInfo.isRemote === true) paymentRequiredError();
  if (ticketTypeInfo.includesHotel === false) paymentRequiredError();

  const hotel = await hotelsRepository.getHotelWithRooms(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

const hotelsService = {
  getHotelsList,
  getHotelAndRoomsByHotelId,
};

export default hotelsService;

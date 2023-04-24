import faker from '@faker-js/faker';
import { Hotel, TicketType } from '@prisma/client';
import { prisma } from '@/config';

export async function createHotel(params: Partial<Hotel> = {}): Promise<Hotel> {
  return await prisma.hotel.create({
    data: {
      name: params.name || faker.company.companyName(),
      image: params.image || faker.image.imageUrl(),
    },
  });
}

export async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({ where: { userId: userId } });
}

export async function createTicketTypeNotRemoteWithHotel(params: Partial<TicketType> = {}): Promise<TicketType> {
  return prisma.ticketType.create({
    data: {
      name: params.name || faker.name.findName(),
      price: params.price || faker.datatype.number(),
      isRemote: params.isRemote || false,
      includesHotel: params.includesHotel || true,
    },
  });
}

export async function createRoomsByHotelId(hotelId: number) {
  return await prisma.room.createMany({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: hotelId,
    },
  });
}

export async function getHotelWithRoomsById(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

export default {
  createHotel,
  findEnrollmentByUserId,
  createTicketTypeNotRemoteWithHotel,
  createRoomsByHotelId,
  getHotelWithRoomsById,
};

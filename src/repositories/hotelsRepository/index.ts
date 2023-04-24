import { Hotel, Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '@/config';
import { HotelWithRoomsType, hotelResponseType } from '@/protocols';

export async function getHotelsList(): Promise<hotelResponseType[]> {
  return await prisma.hotel.findMany();
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
};

export default hotelsRepository;

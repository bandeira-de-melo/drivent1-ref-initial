import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotels() {
  return await prisma.hotel.createMany({
    data: [
      {
        name: faker.name.findName(),
        image: faker.image.imageUrl(),
      },
      {
        name: faker.name.findName(),
        image: faker.image.imageUrl(),
      },
      {
        name: faker.name.findName(),
        image: faker.image.imageUrl(),
      },
    ],
  });
}

export async function creaRoomsByHotelId(hotelId: number) {
  return await prisma.room.createMany({
    data: [
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number({ min: 1, max: 3 }),
        hotelId: hotelId,
      },
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number({ min: 1, max: 3 }),
        hotelId: hotelId,
      },
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number({ min: 1, max: 3 }),
        hotelId: hotelId,
      },
    ],
  });
}

export async function getHotelWithRoomsById(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

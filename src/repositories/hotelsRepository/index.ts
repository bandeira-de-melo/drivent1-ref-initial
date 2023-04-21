import { prisma } from '@/config';
import { hotelResponseType } from '@/protocols';

async function getHotelsList(): Promise<hotelResponseType[]> {
  return await prisma.hotel.findMany();
}

const hotelsRepository = {
  getHotelsList,
};

export default hotelsRepository;

import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createHotelsList, getHotelAndRoomsByHotelId, getHotelsList } from '@/controllers';

const hotelsRounter = Router();

hotelsRounter

  .all('/*', authenticateToken)

  .get('/', getHotelsList)

  .get('/:hotelId', getHotelAndRoomsByHotelId)

  .post('/', createHotelsList);

export { hotelsRounter };

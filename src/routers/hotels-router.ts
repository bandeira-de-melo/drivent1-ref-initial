import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelAndRoomsByHotelId, getHotelsList } from '@/controllers';

const hotelsRounter = Router();

hotelsRounter

  .all('/*', authenticateToken)

  .get('/', getHotelsList)

  .get('/:hotelId', getHotelAndRoomsByHotelId);

export { hotelsRounter };

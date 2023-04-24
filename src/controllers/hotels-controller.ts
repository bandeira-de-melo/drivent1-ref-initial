import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { invalidDataError } from '@/errors';

export async function getHotelsList(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const hotelsList = await hotelsService.getHotelsList(userId);
    return res.status(httpStatus.OK).send(hotelsList);
  } catch (error) {
    if (error.name === 'notFoundError') {
      return res.send(error.message);
    }
    if (error.name === 'paymentRequiredError') {
      return res.send(httpStatus.PAYMENT_REQUIRED);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function getHotelAndRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const userId = Number(req.userId);
  if (!hotelId) throw invalidDataError;
  try {
    const hotel = await hotelsService.getHotelAndRoomsByHotelId(hotelId, userId);
    res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'notFoundError') {
      return res.send(error.message);
    }
    if (error.name === 'paymentRequiredError') {
      return res.send(httpStatus.PAYMENT_REQUIRED);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

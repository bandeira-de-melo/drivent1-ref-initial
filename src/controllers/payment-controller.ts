import { Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/payment-service';
import { AuthenticatedRequest } from '@/middlewares';
import { badRequestError } from '@/errors/bad-request-error';
import { PaymentPost } from '@/protocols';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketId = +req.query.ticketId;

  try {
    if (!ticketId) throw badRequestError();
    const payment = await paymentsService.getPaymenteByTikecketId(ticketId, userId);
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const paymentData = req.body as PaymentPost;
  const userId = req.userId as number;
  try {
    if (!paymentData.ticketId || !paymentData.cardData) {
      throw badRequestError();
    }

    const paymentResult = await paymentsService.postPayment(paymentData, userId);
    res.status(200).send(paymentResult);
  } catch (error) {
    if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

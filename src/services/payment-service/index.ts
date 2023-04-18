import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentPost } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';

import paymentsRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function getPaymenteByTikecketId(ticketId: number, userId: number) {
  const ticket = await paymentsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollmentId = await paymentsRepository.getTicketEnrollmentId(ticketId);
  if (!enrollmentId) throw notFoundError();

  const isUserTicket = await paymentsRepository.checkEnrrolmentUserId(enrollmentId.enrollmentId);
  if (isUserTicket.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.getPayment(ticket.id);
  return payment;
}

async function postPayment(paymentData: PaymentPost, userId: number) {
  const ticket = await paymentsRepository.getTicketById(paymentData.ticketId);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketRepository.getTicketType(ticket.ticketTypeId);

  const enrollment = await paymentsRepository.getEnrollmentById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();
}

const paymentsService = {
  getPaymenteByTikecketId,
  postPayment,
};

export default paymentsService;

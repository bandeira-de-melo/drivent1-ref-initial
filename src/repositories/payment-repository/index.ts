import ticketRepository from '../tickets-repository';
import { PaymentPost } from '@/protocols';
import { prisma } from '@/config';

async function getTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({ where: { id: ticketId } });
}

async function getTicketEnrollmentId(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId },
    select: {
      enrollmentId: true,
    },
  });
}

async function getPaymenteByTikecketId(paymentId: number) {
  return await prisma.payment.findFirst({ where: { id: paymentId } });
}

async function checkEnrrolmentUserId(enrollmentId: number) {
  return await prisma.enrollment.findFirst({
    where: { id: enrollmentId },
    select: { userId: true },
  });
}

async function getPayment(ticketId: number) {
  return await prisma.payment.findFirst({ where: { ticketId } });
}

async function getEnrollmentById(enrollmentId: number) {
  return await prisma.enrollment.findFirst({ where: { id: enrollmentId } });
}

async function updateTicketById(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

async function postPayment({ ticketId, cardData, value }: PaymentPost & { value: number }) {
  return await prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number).slice(-4),
      value: value,
    },
  });
}

const paymentsRepository = {
  getPaymenteByTikecketId,
  getTicketById,
  getTicketEnrollmentId,
  checkEnrrolmentUserId,
  getPayment,
  getEnrollmentById,
  updateTicketById,
  postPayment,
};

export default paymentsRepository;

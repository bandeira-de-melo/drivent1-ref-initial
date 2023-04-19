import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';
import { CardInfoType, PaymentEntity, insertPaymentType } from '@/protocols';

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

async function getPaymenteByTikecketId(paymentId: number): Promise<PaymentEntity> {
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
    where: { id: ticketId },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

async function postPayment(ticketId: number, value: number, cardInfo: CardInfoType) {
  const paymentData: insertPaymentType = {
    ticketId,
    value,
    cardIssuer: cardInfo.issuer,
    cardLastDigits: cardInfo.number.toString().slice(-4),
  };

  return prisma.payment.create({ data: paymentData });
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

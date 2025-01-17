import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import faker from '@faker-js/faker';

import { prisma } from '../src/config';
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';

export async function cleanDb() {
  await prisma.address.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}

//fake data to inject in test DB
export const data = [
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
];

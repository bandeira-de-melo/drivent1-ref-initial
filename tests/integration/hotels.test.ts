import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TicketStatus } from '@prisma/client';
import faker from '@faker-js/faker';
import {
  createEnrollmentWithAddress,
  createHotel,
  createRoomsByHotelId,
  createTicket,
  createTicketTypeNotRemoteWithHotel,
  createUser,
  createUserTicket,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { disconnectDB } from '@/config';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await disconnectDB();
});

const api = supertest(app);

describe('GET /hotels', () => {
  it("should get a status 401 if token isn't sent", async () => {
    const result = await api.get('/hotels');

    expect(result.status).toBe(401);
  });

  it('should get a status 401 if token is not valid', async () => {
    const token = faker.lorem.word;

    const result = await api.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await api.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond status 402 if ticked status is not PAID', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeNotRemoteWithHotel();
    await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

    const response = await api.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });
});

describe('GET /hotels when token is valid', () => {
  it('should respond with status 404 when user is not enrolled', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await api.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and hotels list', async () => {
    await createHotel();
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeNotRemoteWithHotel();
    await createUserTicket(enrollment.id, ticketType.id);

    const response = await api.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

describe('GET /hotels/:hotelId', () => {
  it('should return status 200 with hotel and rooms list', async () => {
    const hotel = await createHotel();
    await createRoomsByHotelId(hotel.id);
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeNotRemoteWithHotel();
    await createUserTicket(enrollment.id, ticketType.id);

    const response = await api.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

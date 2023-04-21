export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Ticket = {
  id: number;
  status: 'RESERVED' | 'PAID';
  tickeTypeId: number;
  enrollmentId: number;
  createdAt?: Date | string;
  updatedAt: Date | string;
};

export type PaymentEntity = {
  id: number;
  ticketId: number;
  value: number;
  cardIssuer: string; //VISA | MASTERCARD
  cardLastDigits: string;
  createdAt: Date;
  updatedAt: Date;
};
export type postPaymentType = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export type CardInfoType = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export type insertPaymentType = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

export type ticketInfoType = {
  id: number;
  status: string; //RESERVED | PAID
  ticketTypeId: number;
  enrollmentId: number;
  TicketType: {
    id: number;
    name: string;
    price: number;
    isRemote: boolean;
    includesHotel: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type hotelResponseType = {
  id: number;
  name: string;
  image: string;
};

export type Hotel = {
  id: number;
  name: string;
  image: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type postHotel = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;

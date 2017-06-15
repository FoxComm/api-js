import type { Address } from '../address';

export type CreditCardPayment = {|
  id: number,
  customerId: number,
  holderName: string,
  lastFour: string,
  expMonth: number,
  expYear: number,
  brand: string,
  address: Address,
  type: 'creditCard',
  createdAt: string,
|};

export type GiftCardPayment = {|
  code: string,
  amount: number,
  currentBalance: number,
  availableBalance: number,
  createdAt: string,
  type: 'giftCard',
|};

export type StoreCreditPayment = {|
  id: number,
  amount: number,
  currentBalance: number,
  availableBalance: number,
  createdAt: string,
  type: 'storeCredit',
|};

export type CordPayment = CreditCardPayment | GiftCardPayment | StoreCreditPayment;

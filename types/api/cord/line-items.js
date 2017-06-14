
import type { CreateAddressPayload } from '../address';

export type LineItemAdjustment = {
  adjustmentType: string,
  subtract: number,
  lineItemRefNum?: string,
}

export type LineItemState = 'cart' | 'pending' | 'preOrdered' | 'backOrdered' | 'canceled' | 'shipped';

export type GiftCardLineItemAttributes = {
  senderName: string,
  recipientName: string,
  recipientEmail: string,
  message?: string,
  code?: string,
}

export type LineItemAttributes = {
  giftCard?: GiftCardLineItemAttributes,
  subscription?: CreateAddressPayload,
}

export type LineItem = {
  imagePath: string,
  referenceNumbers: Array<string>,
  name?: string,
  sku: string,
  price: number,
  quantity: number,
  totalPrice: number,
  productFormId: number,
  externalId?: string,
  trackInventory: boolean,
  state: LineItemState,
  attributes?: LineItemAttributes,
}

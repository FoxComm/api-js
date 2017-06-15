import type { Address } from './address';
import type { Customer } from './customer';
import type { Promotion } from './promotion';
import type { CordResponseCouponPair } from './cord/promotions';
import type { LineItem, LineItemAdjustment } from './cord/line-items';
import type { PaymentState } from './cord/base';
import type { OrderTotals } from './cord/totals';
import type { ShippingMethod } from './shipping-method';
import type { CreditCardPayment, CordPayment } from './cord/payments';

export type OrderState = 'fraudHold' | 'remorseHold' | 'manualHold' | 'canceled' | 'fulfillmentStarted' | 'shipped';

export type Order = {
  referenceNumber: string,
  paymentState: PaymentState,
  lineItems: {
    skus: Array<LineItem>,
  },
  lineItemAdjustments: Array<LineItemAdjustment>,
  promotion?: Promotion,
  coupon?: CordResponseCouponPair,
  totals: OrderTotals,
  customer: Customer,
  shippingMethod: ShippingMethod,
  shippingAddress: Address,
  billingAddress?: Address,
  billingCreditCardInfo?: CreditCardPayment,
  paymentMethods: Array<CordPayment>,
  // Order-specific
  orderState: OrderState,
  shippingState?: OrderState,
  fraudScore: number,
  remorsePeriodEnd?: string,
  placedAt: string,
};

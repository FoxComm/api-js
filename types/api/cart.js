
import type { Address } from './address';
import type { Customer } from './customer';
import type { Promotion } from './promotion';
import type { CordResponseCouponPair } from './cord/promotions';
import type { LineItem, LineItemAdjustment } from './cord/line-items';
import type { PaymentState } from './cord/base';
import type { CartTotals } from './cord/totals';
import type { ShippingMethod } from './shipping-method';
import type { CordPayment } from './cord/payments';

export type Cart = {
  referenceNumber: string,
  paymentState: PaymentState,
  lineItems: {
    skus: Array<LineItem>,
  },
  lineItemAdjustments: Array<LineItemAdjustment>,
  promotion?: Promotion,
  coupon?: CordResponseCouponPair,
  totals: CartTotals,
  customer?: Customer,
  shippingMethod?: ShippingMethod,
  shippingAddress?: Address,
  paymentMethods: Array<CordPayment>,
};

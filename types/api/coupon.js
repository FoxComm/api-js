
import type { Context, Attributes } from './base';

export type Coupon = {
  id: number,
  context: Context,
  attributes: Attributes,
  archivedAt?: string,
  promotion: number,
};

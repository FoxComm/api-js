
import type { Context, Attributes } from './base';

type PromotionApplyType = 'auto' | 'coupon';

type Discount = {
  id: number,
  context?: Context,
  attributes: Attributes, // @TODO, define attributes
};

export type Promotion = {
  id: number,
  context: Context,
  applyType: PromotionApplyType,
  attributes: Attributes, // @TODO, define attributes
  discounts: Array<Discount>,
  archivedAt?: string,
};

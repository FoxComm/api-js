// @class CrossSell
// Accessible via [cross-sell](#foxapi-crosssell) property of [FoxApi](#foxapi) instance.

import * as endpoints from '../endpoints';

export default class CrossSell {
  constructor(api) {
    this.api = api;
  }

  /**
   * @private
   * @method crossSellTrain(purchaseEvent: PurchaseEventObject): Promise
   *
   * Sends a purchase event object to populate a sparse matrix for cross-sell
   * analytics and related product tracking. The POST body is an object with a
   * customer ID, channel ID, and a list of product ID's purchased by the customer.
   * This method is intended for Admin use only.
   */
  crossSellTrain(pointsObj) {
    return this.api.post(endpoints.crossSellTrain, pointsObj);
  }

  /**
   * @method crossSellRelated(productId: Number, channelId: Number): Promise
   *
   * Returns JSON of what products are similar to the productId in the query params.
   * { "products": [ RelatedProduct ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   */
  crossSellRelated(productId, channelId) {
    const query = `?channel=${channelId}`;
    const url = `${endpoints.crossSellRelated}${productId}${query}`;
    return this.api.get(url);
  }

  /**
   * @method crossSellRelatedFull(productId: Number, channelId: Number, size: Number): Promise
   *
   * Returns JSON of what products are similar to the productId in the query params.
   * { "products": [ RelatedProductFull ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   */
  crossSellRelatedFull(productId, channelId, size) {
    const query = `?channel=${channelId}&size=${size}`;
    const url = `${endpoints.crossSellRelatedFull}${productId}${query}`;
    return this.api.get(url);
  }

  /**
   * @method crossSellCustomerRelated(customerId: Number, channelId: Number): Promise
   *
   * Returns JSON of what products are similar to the products purchased by the
   * customer in the query params.
   * { "products": [ RelatedProduct ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   */
  crossSellCustomerRelated(customerId, channelId) {
    const query = `?channel=${channelId}`;
    const url = `${endpoints.crossSellCustomerRelated}${customerId}${query}`;
    return this.api.get(url);
  }

  /**
   * @method crossSellCustomerRelatedFull(customerId: Number, channelId: Number, size: Number): Promise
   *
   * Returns JSON of what products are similar to the products purchased by the
   * customer in the query params.
   * { "products": [ RelatedProductFull ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   */
  crossSellCustomerRelatedFull(customerId, channelId, size) {
    const query = `?channel=${channelId}&size=${size}`;
    const url = `${endpoints.crossSellCustomerRelatedFull}${customerId}${query}`;
    return this.api.get(url);
  }
}

// @miniclass PurchaseEventObject (CrossSell)
// @field cust_id: Number
// CustomerID number
//
// @field prod_ids: Array<Number>
// ProductID numbers
//
// @field channel_id: Number
// Unique Channel ID number

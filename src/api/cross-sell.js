// @class CrossSell
// Accessible via [analytics](#foxapi-analytics) property of [FoxApi](#foxapi) instance.

import * as endpoints from '../endpoints';

export default class CrossSell {
  constructor(api) {
    this.api = api;
  }

  /**
   * @private
   * @method crossSellTrain(pointsObj: object): Promise
   * @param {Object} purchaseObj
   *
   * Sends a purchase event object to populate a sparse matrix for cross-sell
   * analytics and related product tracking. The POST body is an object with a
   * customer ID, channel ID, and a list of product ID's purchased by the customer.
   * This method is intended for Admin use only.
   *
   * @example purchaseObj
   *
   * ```
   * {
   *    "cust_id": 1,
   *    "channel_id": 1,
   *    "prod_ids": [1, 2, 3, 4]
   * }
   * ```
   */
  crossSellTrain(pointsObj) {
    return this.api.post(endpoints.crossSellTrain, pointsObj);
  }

  /**
   * @method crossSellRelated(productId: Int, channelId: Int): Promise
   * @param {Int} productId
   * @param {Int} channelId
   *
   * Returns JSON of what products are similar to the productId in the query params.
   * { "products": [ RelatedProduct ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   *
   * @example Request
   *
   * /v1/public/recommend/prod-prod/3?channel=2
   *
   * @example Response
   *
   * ```
   * {
   *    "products": [
   *      {
   *        "id": 2,
   *        "score": 0
   *      },
   *      {
   *        "id": 1,
   *        "score": 1
   *      },
   *      {
   *        "id": 0,
   *        "score": 0
   *      }
   *    ]
   * }
   * ```
   */
  crossSellRelated(productId, channelId) {
    const query = `?channel=${channelId}`;
    const url = `${endpoints.crossSellRelated}${productId}${query}`;
    return this.api.get(url);
  }

  /**
   * @method crossSellRelatedFull(productId: Int, channelId: Int, size: Int): Promise
   * @param {Int} productId
   * @param {Int} channelId
   * @param {Int} size
   *
   * Returns JSON of what products are similar to the productId in the query params.
   * { "products": [ RelatedProductFull ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   *
   * @example Request
   *
   * /v1/public/recommend/prod-prod/3?channel=2
   *
   * @example Response
   *
   * ```
   * {
   *   "products": [
   *   {
   *     "product": {
   *        "id": 300,
   *        "productId": 60727,
   *        "scope": "1",
   *        "albums": [ { "images": [...], "name": "default" } ],
   *        "context": "default",
   *        "currency": "USD",
   *        "description": "...",
   *        "retailPrice": "8500",
   *        "salePrice": "8500",
   *        "skus": [ "AB9403_310", "AB9403_330", "AB9403_350", "AB9403_370" ],
   *        "slug": "dynamo-away-replica-jersey",
   *        "tags": [ "Apparel", "Soccer" ],
   *        "taxonomies": [
   *          { "taxonomy": "brand", "taxons": [ [ "Performance" ] ] },
   *          { "taxonomy": "category", "taxons": [ [ "Apparel" ] ] },
   *          { "taxonomy": "color", "taxons": [ [ "Black" ], [ "Light Orange" ] ] },
   *        ],
   *        "title": "Dynamo Away Replica Jersey"
   *      },
   *      "score": 0.129*9944487358058
   *   },
   *   {
   *     "product": {
   *        ...
   *     },
   *     "score": 0.07715167498104597
   *   }
   *  ]
   *}
   * ```
   */
  crossSellRelatedFull(productId, channelId, size) {
    const query = `?channel=${channelId}&size=${size}`;
    const url = `${endpoints.crossSellRelatedFull}${productId}${query}`;
    return this.api.get(url);
  }
}

  /**
   * @method crossSellCustomerRelated(customerId: Int, channelId: Int): Promise
   * @param {Int} customerId
   * @param {Int} channelId
   *
   * Returns JSON of what products are similar to the products purchased by the
   * customer in the query params.
   * { "products": [ RelatedProduct ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   *
   * @example Request
   *
   * /v1/public/recommend/cust-prod/3?channel=2
   *
   * @example Response
   *
   * ```
   * {
   *    "products": [
   *      {
   *        "id": 2,
   *        "score": 0
   *      },
   *      {
   *        "id": 1,
   *        "score": 1
   *      },
   *      {
   *        "id": 0,
   *        "score": 0
   *      }
   *    ]
   * }
   * ```
   */
  crossSellCustomerRelated(customerId, channelId) {
    const query = `?channel=${channelId}`;
    const url = `${endpoints.crossSellCustomerRelated}${customerId}${query}`;
    return this.api.get(url);
  }

  /**
   * @method crossSellCustomerRelatedFull(customerId: Int, channelId: Int, size: Int): Promise
   * @param {Int} customerId
   * @param {Int} channelId
   * @param {Int} size
   *
   * Returns JSON of what products are similar to the products purchased by the
   * customer in the query params.
   * { "products": [ RelatedProductFull ] }
   *
   * Score == 1 means these products were purchased by the exact same set of customers.
   * Score == 0 means no customer has purchased both of these
   *
   * @example Request
   *
   * /v1/public/recommend/cust-prod/3?channel=2
   *
   * @example Response
   *
   * ```
   * {
   *   "products": [
   *   {
   *     "product": {
   *        "id": 300,
   *        "productId": 60727,
   *        "scope": "1",
   *        "albums": [ { "images": [...], "name": "default" } ],
   *        "context": "default",
   *        "currency": "USD",
   *        "description": "...",
   *        "retailPrice": "8500",
   *        "salePrice": "8500",
   *        "skus": [ "AB9403_310", "AB9403_330", "AB9403_350", "AB9403_370" ],
   *        "slug": "dynamo-away-replica-jersey",
   *        "tags": [ "Apparel", "Soccer" ],
   *        "taxonomies": [
   *          { "taxonomy": "brand", "taxons": [ [ "Performance" ] ] },
   *          { "taxonomy": "category", "taxons": [ [ "Apparel" ] ] },
   *          { "taxonomy": "color", "taxons": [ [ "Black" ], [ "Light Orange" ] ] },
   *        ],
   *        "title": "Dynamo Away Replica Jersey"
   *      },
   *      "score": 0.129*9944487358058
   *   },
   *   {
   *     "product": {
   *        ...
   *     },
   *     "score": 0.07715167498104597
   *   }
   *  ]
   *}
   * ```
   */
  crossSellCustomerRelatedFull(customerId, channelId, size) {
    const query = `?channel=${channelId}&size=${size}`;
    const url = `${endpoints.crossSellCustomerRelatedFull}${customerId}${query}`;
    return this.api.get(url);
  }
}

// @miniclass Point (CrossSell)
// @field cust_id: Number
// CustomerID number
//
// @field prod_ids: Array<Number>
// ProductID numbers
//
// @field chanID: Number
// Unique Channel ID number

// @miniclass RelatedProduct (CrossSell)
// @field id: Number
// RelatedProduct ID number
//
// @field score: Number
// RelatedProduct Similarity score

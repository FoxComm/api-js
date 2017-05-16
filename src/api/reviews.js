
// @class Reviews
// Accessible via [reviews](#foxapi-reviews) property of [FoxApi](#foxapi) instance.

import * as endpoints from '../endpoints';

export default class Reviews {
  constructor(api) {
    this.api = api;
  }

  // @method add(review: ReviewPayload): Promise<Review>
  // Adds a new product review.
  add(review) {
    return this.api.post(endpoints.review, review);
  }

  // @method update(reviewId: Number, review: ReviewPayload): Promise<Review>
  // Updates the selected product review.
  update(reviewId, review) {
    return this.api.patch(endpoints.review(reviewId), review);
  }

  // @method delete(reviewId: Number): Promise
  // Deletes the selected product review.
  delete(reviewId) {
    return this.api.delete(endpoints.review(reviewId));
  }

  // @method search(query: Object, size: Number): Promise
  // Uses `query` to search product reviews.
  search(query, size) {
    return this.api.post(endpoints.reviewSearch(size), query);
  }
}

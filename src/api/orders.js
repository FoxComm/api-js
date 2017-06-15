// @class Orders

import * as endpoints from '../endpoints';

export default class Orders {
  constructor(api) {
    this.api = api;
  }

  // @method list(): Promise
  list() {
    return this.api.get(endpoints.orders);
  }

  // @method get(referenceNumber: string): Promise
  get(referenceNumber) {
    return this.api.get(endpoints.order(referenceNumber));
  }
}

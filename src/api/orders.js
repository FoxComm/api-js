
// @class Orders

import * as endpoints from '../endpoints';

function buildQuery(customerId) {
  return {
    'query': {
      'nested': {
        'path': 'customer',
        'query': {
          'term': {
            'customer.id': {
              'value': customerId
            }
          }
        }
      }
    }
  }
}

export default class Orders {
  constructor(api) {
    this.api = api;
  }

  // @method list(): Promise
  list() {
    const customerId = this.api.getCustomerId();
    if (customerId != null) {
      const query = buildQuery(customerId);
      return this.api.post(endpoints.orders, query);
    } else {
      return Promise.reject({errors: ['Please sign in first']});
    }
  }

  // @method get(referenceNumber: string): Promise
  get(referenceNumber) {
    return this.api.get(endpoints.order(referenceNumber));
  }
}

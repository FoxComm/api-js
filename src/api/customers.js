
// @class Customers
// Accessible via [customers](#foxapi-customers) property of [FoxApi](#foxapi) instance.

import endpoints from '../endpoints';

export default class Customers {
  constructor(api) {
    this.api = api;
  }

  /**
   * @method one(customerId: Number): Promise<CustomerResponse>
   * Finds customer by id.
   */
  one(customerId) {
    return this.api.get(endpoints.customer(customerId));
  }

  /**
   * @method create(customer: CustomerCreatePayload): Promise<CustomerResponse>
   * Creates new customer.
   */
  create(customer) {
    return this.api.post(endpoints.customers, customer);
  }

  /**
   * @method update(customerId: Number, customer: CustomerUpdatePayload): Promise<CustomerResponse>
   * Updates customer details.
   */
  update(customerId, customer) {
    return this.api.patch(endpoints.customer(customerId), customer);
  }
}

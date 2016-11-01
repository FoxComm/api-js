
// @class Account

import * as endpoints from '../endpoints';

export default class Account {
  constructor(api) {
    this.api = api;
  }

  // @method get(): Promise<LoginResponse>
  get() {
    return this.api.get(endpoints.account);
  }

  // @method update(payload: UpdateCustomerPayload): Promise<LoginResponse>
  // Updates account.
  update(payload) {
    return this.api.patch(endpoints.account, payload);
  }
}

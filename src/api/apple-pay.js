import * as endpoints from '../endpoints';
import { isBrowser, loadScript } from '../utils/browser';

export default class ApplePay {
  constructor(api) {
    this.api = api;
    if (isBrowser()) {
      // load Stripe.js
      loadScript('https://js.stripe.com/v2/').then(() => {
        Stripe.setPublishableKey(this.api.stripe_key);
      });
    }
  }

  // @method available(): Boolean
  // check if payment with apple pay is possible
  available() {
    return Stripe.applePay.checkAvailability((available) => available);
  }
}

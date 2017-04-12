import * as endpoints from '../endpoints';

export default class ApplePay {
  constructor(api, stripe) {
    this.api = api;
    this.stripe = stripe;
  }

  // @method available(): Promise
  // check if payment with apple pay is possible
  available() {
    return this.stripe.then(() => {
      return new Promise((resolve, reject) => {
        Stripe.applePay.checkAvailability((available) => {
          console.log('response from api-js -> ', available);
          resolve(available);
        });
      });
    });
  }

  beginApplePay(paymentRequest) {
    return new Promise((resolve, reject) => {
      console.log('starting apple pay payment process');
      console.log('received the request obj -> ', paymentRequest);
      const session = Stripe.applePay.buildSession(paymentRequest,
        (result, completion) => {
          console.log('session is built');
          console.log('result obj returned -> ', result);
          completion(ApplePaySession.STATUS_SUCCESS);
          console.log('completion func is invoked with status -> success');
          resolve();
        },
        (err) => {
          console.log('Stripe encountered an error with your configuration or has a problem with your user\'s payment information.');
          reject(err.message);
        });

      console.log('start the session');
      console.log('session obj -> ', session);
      session.begin();
    });
  }
}

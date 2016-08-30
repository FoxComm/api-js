// @class CreditCards
// Accessible via [creditCards](#foxapi-creditcards) property of [FoxApi](#foxapi) instance.

import * as endpoints from '../endpoints';
import { isBrowser, loadScript } from '../utils/browser';

export default class CreditCards {
  constructor(api) {
    this.api = api;

    if (isBrowser()) {
      // load Stripe.js
      loadScript('https://js.stripe.com/v2/').then(() => {
        Stripe.setPublishableKey(this.api.stripe_key);
      });
    }
  }

  // @method list(): Promise<CreditCardsResponse>
  // Returns list of all credit cards.
  list() {
    return this.api.get(endpoints.creditCards);
  }

  // @method one(creditCardId: Number): Promise<CreditCard>
  // Returns credit card by id.
  one(creditCardId) {
    return this.api.get(endpoints.creditCard(creditCardId));
  }

  // @method add(creditCard: CreditCardCreatePayload): Promise<CreditCard>
  // Adds new credit card.
  create(creditCard, billingAddress) {
    return new Promise((resolve, reject) => {
      Stripe.card.createToken({
        name: creditCard.name,
        number: creditCard.number,
        cvc: creditCard.cvc,
        exp_month: creditCard.expMonth,
        exp_year: creditCard.expYear
      }, (status, response) => {
        if (response.error) {
          reject(response.error);
        } else {
          var payload = {
            token: response.id,
            lastFour: response.card.last4,
            expMonth: response.card.exp_month,
            expYear: response.card.exp_year,
            brand: response.card.brand,
            billingAddress: billingAddress,
          };

          return this.api.post(endpoints.creditCards, payload)
            .then(response => resolve(response))
            .catch(err => !!err.responseJson.errors ? reject(err.responseJson.errors) : reject([err.message]));
        }
      });
    });
  }

  // @method update(creditCardId: Number, creditCard: CreditCardUpdatePayload): Promise<CreditCard>
  // Updates selected credit card.
  update(creditCardId, creditCard) {
    return this.api.patch(endpoints.creditCard(creditCardId), creditCard);
  }

  // @method setAsDefault(creditCardId: Number): Promise<CreditCard>
  // Sets selected credit card as default.
  setAsDefault(creditCardId) {
    return this.api.post(endpoints.creditCardDefault(creditCardId));
  }

  // @method delete(creditCardId: Number): Promise
  // Deletes selected credit card.
  delete(creditCardId) {
    return this.api.delete(endpoints.creditCard(creditCardId));
  }

  cardType(number = '') {
    return Stripe.card.cardType(number);
  }

  validateCardNumber(number = '') {
    return Stripe.card.validateCardNumber(number);
  }

  validateCVC(cvc = '') {
    return Stripe.card.validateCVC(cvc);
  }

  validateExpiry(month = '', year = '') {
    return Stripe.card.validateExpiry(month, year);
  }
}

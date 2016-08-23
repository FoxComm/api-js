
// @class CreditCards
// Accessible via [creditCards](#foxapi-creditcards) property of [FoxApi](#foxapi) instance.

import * as endpoints from '../endpoints';
import Stripe from '../vendor/stripe';

const pKey = "pk_test_r6t0niqmG9OOZhhaSkacUUU1";

Stripe.setPublishableKey(pKey);


export default class CreditCards {
  constructor(api) {
    this.api = api;
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
  add(creditCard) {
    return new Promise((resolve, reject) => {
      Stripe.card.createToken({
        number: creditCard.number,
        cvc: creditCard.cvv,
        exp_month: creditCard.expMonth,
        exp_year: creditCard.expYear,
      }, (response) => {
          if (response.error) {
              reject(response.error);
          } else {
            resolve(this.api.post(endpoints.creditCard(response.id)));
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
}

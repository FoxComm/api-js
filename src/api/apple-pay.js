/* @flow */

import * as endpoints from '../endpoints';
import _ from 'lodash';
import {
  parseAmount,
  shippingAddressToPayload,
  shippingMethodsToPayload,
  getLineItems,
  failurePayload
} from '../utils/apple-pay-helpers';
import { parseError } from '../index';

export default class ApplePay {
  constructor(api: any, stripe: Promise<*>) {
    this.api = api;
    this.stripe = stripe;
  }
  api: any;
  stripe: Promise<*>;

  // @method available(): Promise
  // check if payment with apple pay is possible
  available(): Promise<*> {
    return this.stripe.then(() => {
      return new Promise((resolve, reject) => {
        Stripe.applePay.checkAvailability((available) => {
          resolve(available);
        });
      });
    });
  }

  // @method beginApplePay(): Promise
  // Starts the apple pay process
  beginApplePay(paymentRequest: Object, lineItems: Object): Promise<*> {
    return new Promise((resolve, reject) => {
      const session = Stripe.applePay.buildSession(paymentRequest,
        (result, completion) => {
          shippingAddressToPayload(result.shippingContact, this.api).then((shippingAddress) => {
            return this.api.put(endpoints.shippingAddress, shippingAddress);
          }).then((resp) => {
            return this.api.post(endpoints.applePayCheckout, { stripeToken: result.token.id });
          }).then((resp) => {
            completion(ApplePaySession.STATUS_SUCCESS);
            resolve(resp);
          })
          .catch((err) => {
            completion(ApplePaySession.STATUS_FAILURE);
            reject(err);
          });
        },
        (err) => {
          reject(err);
        });

        // this method will be called when a shipping address has been chosen
        session.onshippingcontactselected = (event: Object) => {
          const shippingAddr = event.shippingContact;
          const addresses = shippingAddressToPayload(shippingAddr, this.api)
            .then((shippingAddress) => {
              return this.api.put(endpoints.shippingAddress, shippingAddress);
            })
            .then((resp) => {
              return this.api.get(endpoints.shippingMethodsByCountry(paymentRequest.countryCode));
            });

          const methods = addresses.then((methods) => {
              const shippingMethodId = methods[0].id;

              return this.api.patch(endpoints.shippingMethod, { shippingMethodId });
            });

          Promise.all([addresses, methods]).then((results) => {
            const methods = results[0];
            const cart = results[1].result;
            const newShippingMethods = shippingMethodsToPayload(methods);
            const status = ApplePaySession.STATUS_SUCCESS;
            const taxPromotion = {
              taxes: cart.totals.taxes,
              promotion: cart.totals.adjustments,
            };
            const newLineItems = getLineItems(taxPromotion, cart.totals.shipping);
            const newTotal = {
              label: paymentRequest.total.label,
              amount: parseAmount(cart.totals.total),
            };

            session.completeShippingContactSelection(status, newShippingMethods, newTotal, newLineItems);
          })
          .catch((err) => {
            const args = failurePayload(paymentRequest, ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS);
            session.completeShippingContactSelection(...args);
            throw new Error(parseError(err));
          });
        };

          // this method will be called when a shipping method has been chosen
          session.onshippingmethodselected = (event: Object) => {
            const shippingMethodId = parseInt(event.shippingMethod.identifier);
            this.api.patch(endpoints.shippingMethod, { shippingMethodId }).then((resp) => {
              const response = resp.result;
              const taxPromotion = {
                taxes: response.totals.taxes,
                promotion: response.totals.adjustments,
              };
              const newLineItems = getLineItems(taxPromotion, response.totals.shipping);
              const newTotal = {
                label: paymentRequest.total.label,
                amount: parseAmount(response.totals.total),
              };
              const status = ApplePaySession.STATUS_SUCCESS;

              session.completeShippingMethodSelection(status, newTotal, newLineItems);
            })
            .catch((err) => {
              const args = failurePayload(paymentRequest, ApplePaySession.STATUS_FAILURE, true);
              session.completeShippingContactSelection(...args);
              throw new Error(parseError(err));
            });
          };

          // this method will be called when the apple payment sheet has been dismissed
          session.oncancel = () => {
            this.api.get(endpoints.addresses).then((addresses) => {
              _.forEach(addresses, (address) => {
                if (address.name === 'Default Name' && address.address1 === 'Default Street') {
                  this.api.delete(endpoints.address(address.id));
                }
              });
            });

            this.api.delete(endpoints.shippingAddress);
          };

          session.begin();
        });
      }
    }

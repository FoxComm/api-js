import * as endpoints from '../endpoints';
import _ from 'lodash';

// temporary hack to get the id, will be done on the server side once the endpoint is ready
const getShippingMethodId = (amount) => {
 const parsedAmount = parseInt(amount);
 console.log('parsedAmount -> ', parsedAmount);
 switch (parsedAmount) {
   case 0:
     return 2;
   case 3:
     return 1;
   case 15:
     return 3;
   case 30:
     return 4;
   default:
     return 0;
 }
};

const shippingAddressToPayload = (contact) => {
 console.log('turning response to payload');
 /*
  administrativeArea: "CA"
  country: "USA"
  countryCode: "us"
 */
 const { givenName, familyName, addressLines, locality, postalCode, phoneNumber } = contact;
 return {
   name: givenName + ' ' + familyName,
   regionId: 4129, // id for California
   address1: addressLines[0],
   address2: _.isEmpty(addressLines[1]) ? '' : addressLines[1],
   city: locality,
   zip: postalCode,
   phoneNumber: phoneNumber.replace(/[^\d]/g, ''),
   isDefault: false,
 };
};

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
          const shippingAddress = shippingAddressToPayload(result.shippingContact);
          console.log('shippingAddress from response -> ', shippingAddress);
          this.api.post(endpoints.shippingAddress, shippingAddress).then((resp) => {
            console.log('sent the shipping address to the server, resp -> ', resp);
            this.api.post(endpoints.applePayCheckout, { stripeToken: result.token.id })
              .then((resp) => {
                console.log('token id sent -> ', result.token.id);
                console.log('checkout is successfull');
                completion(ApplePaySession.STATUS_SUCCESS);
                resolve(resp);
              })
              .catch((err) => {
                console.log('something went wrong...');
                console.log(err);
                completion(ApplePaySession.STATUS_FAILURE);
                throw new Error(err);
                reject(err);
              });
          });
        },
        (err) => {
          console.log('Stripe encountered an error with your configuration or has a problem with your user\'s payment information.');
          reject(err.message);
        });

      session.onshippingcontactselected = (event) => {
        console.log('shipping address set');
        console.log('event obj -> ', event);
        console.log('shipping address info -> ', event.shippingContact);
        const status = ApplePaySession.STATUS_SUCCESS;

        // temp solution for retrieving the shipping methods
        const isFree = parseInt(paymentRequest.total.amount) >= 50;

        const newShippingMethods = [
          {
            label: isFree ? 'Free' : 'Standard',
            detail: 'USPS',
            amount: isFree ? '0.00' : '3.00',
            identifier: 'usps',
          },
          {
            label: '2-3 day',
            detail: 'FedEx',
            amount: '15.00',
            identifier: 'fedexlong',
          },
          {
            label: 'Overnight',
            detail: 'FedEx',
            amount: '30.00',
            identifier: 'fedexquick',
          },
        ];
        const newTotal = Object.assign(paymentRequest.total, {});
        const newLineItems = [];
        console.log('newTotal -> ', newTotal);
        console.log('shipping methods -> ', newShippingMethods);
        session.completeShippingContactSelection(status, newShippingMethods, newTotal, newLineItems);
        console.log('successfully updated the shipping address');

      };

      session.onshippingmethodselected = (event) => {
        console.log('shipping method selected');
        console.log('event obj -> ', event);
        console.log('shipping method chosen -> ', event.shippingMethod);
        const newAmount = parseFloat(paymentRequest.total.amount) + parseFloat(event.shippingMethod.amount);
        const newTotal = {
          label: paymentRequest.total.label,
          amount: newAmount.toString(),
        };
        const newLineItems = [];
        const status = ApplePaySession.STATUS_SUCCESS;
        console.log('new total -> ', newTotal);

        const shippingMethodId = getShippingMethodId(event.shippingMethod.amount);
        console.log('method id -> ', methodId);
        this.api.patch(endpoints.shippingMethod, { shippingMethodId })
          .then(() => {
            session.completeShippingMethodSelection(status, newTotal, newLineItems);
            console.log('successfully updated the shipping methods');
        });
      };

      console.log('start the session');
      console.log('session obj -> ', session);
      session.begin();
    });
  }
}

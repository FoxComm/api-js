/* @flow */

import * as endpoints from '../endpoints';
import _ from 'lodash';

// @method parseAmount(amount: String): Number
// parses the stripe.js format into apple-pay acceptable format
export const parseAmount = (amount: string): number => {
  const result = (parseFloat(amount) / 100).toFixed(2);
  return parseFloat(result);
};

// @method shippingAddressToPayload(contact: Object, api: Object)
// Parses the data sent from Apple into the server-accepted format
export function shippingAddressToPayload(contact: Object, api: Object): Promise<*> {
  const { givenName, familyName, addressLines, locality, postalCode, phoneNumber, administrativeArea } = contact;

  return api.get(endpoints.regionIdByCode(administrativeArea)).then((resp) => {
    const firstName = givenName || 'Default';
    const lastName = familyName || 'Name';
    const address1 = addressLines ? addressLines[0] : 'Default Street';
    const phone = phoneNumber ? phoneNumber.replace(/[^\d]/g, '') : '8888888888';
    const address2 = addressLines ? addressLines[1] : '';

    const payload = {
      name: `${firstName} ${lastName}`,
      regionId: resp.id,
      address1,
      address2: _.isEmpty(address2) ? '' : address2,
      city: locality,
      zip: postalCode,
      phoneNumber: phone,
      isDefault: false,
    };

    return payload;
  });
}

// @method shippingMethodsToPayload(methods: Array<Object>)
// Parses the server-sent shipping methods into Apple format payload
export function shippingMethodsToPayload(methods: Array<Object>): Array<Object> {
  return _.map(methods, (method) => {
    return {
      label: method.code,
      detail: method.name,
      amount: parseAmount(method.price),
      identifier: method.id,
    };
  });
}

// @methods getLineItems(lineItems: Object, shippingCost: Number)
// Parses additional costs into Apple accepted format
export function getLineItems(lineItems: Object, shippingCost: string): Array<Object> {
  const { taxes, promotion } = lineItems;
  const items = [
    {
      label: 'Shipping',
      type: 'final',
      amount: parseAmount(shippingCost),
    },
  ];

  if (taxes != null) {
    items.push({
      label: 'Tax',
      type: 'final',
      amount: parseAmount(taxes),
    });
  }

  if (promotion) {
    items.push({
      label: 'Promotion',
      type: 'final',
      amount: parseAmount(promotion) * -1,
    });
  }

  return items;
}

// @method failurePayload(paymentRequest: Object, status: Number, isShippingMethod: Boolean)
// Assembles the correct payload to send to the callback function when payment fails
export function failurePayload(
  paymentRequest: Object,
  status: number,
  isShippingMethod: boolean = false
): Array<mixed> {
  if (isShippingMethod) {
    return [
      status,
      {
        label: paymentRequest.total.label,
        amount: paymentRequest.total.amount,
      },
      [],
    ];
  }

  return [
    status,
    [],
    {
      label: paymentRequest.total.label,
      amount: paymentRequest.total.amount,
    },
    [],
  ];
}

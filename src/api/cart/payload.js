
const x = {
  "customer": {
    "email": "yax@yax.com",
      // Both optional
      "name": "Yax Fuentes",
      "password": "abracadabra238"
  },
  "lineItems": [
    {
      "sku": "SKU-YAX",
      "quantity": 1
    },
    {
      "sku": "SKU-ABC",
      "quantity": 2
    }
  ],
  "payments": {
    // Both optional
    "creditCard": {
      "holderName": "Yax Fuentes",
        "cardNumber": "5555444433332222",
        "cvv": "012",
        "expYear": 2020,
        "expMonth": 12,
        "address": {
          "name": "My Billing Address",
          "regionId": 1,
          "address1": "Donkey Street 38",
          "address2": "", // Optional
          "city": "Donkeyville",
          "zip": "98112",
          "phoneNumber": "555-55-55" // Optional
        }
    },
    "giftCard": {
      "code": "ABCDEFGXYZ",
        "amount": 100 // Optional?
    }
  },
  "addresses": {
    "shippingAddress": {
      "name": "My Shipping Address",
      "regionId": 1,
      "address1": "Donkey Street 38",
      "address2": "", // Optional
      "city": "Donkeyville",
      "zip": "98112",
      "phoneNumber": "555-55-55" // Optional
    },
    "shippingMethod": {
      "shippingMethodId": 1
    }
  },
  "coupon": "ABCDEFG" // Optional
};

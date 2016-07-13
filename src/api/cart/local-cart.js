
/*
 @class LocalCart
 Store and manage cart at local storage. And then checkout new order by sending local cart payload at once.
 Accessible via [localCart](#foxapi-localcart) property of [FoxApi](#foxapi) instance.
 */


import _ from 'lodash';
import * as endpoints from '../../endpoints';

export default class LocalCart {
  constructor(api) {
    this.api = api;

    this.payload = {
      lineItems: [],
      payments: {},
      addresses: {},
    };
  }

  /**
   * @method getShippingMethods(): Promise<ShippingMethod[]>
   * Returns available shipping methods.
   */
  getShippingMethods() {
    return this.api.get(endpoints.shippingMethods);
  }

  /**
   * @method chooseShippingMethod(shippingMethodId: Number): void
   * Chooses shipping method for the cart.
   */
  chooseShippingMethod(shippingMethodId) {
    this.payload.addresses.shippingMethod = {
      shippingMethodId,
    };
  }

  /**
   * @method removeShippingMethod(): void
   * Removes the shipping method from the cart.
   */
  removeShippingMethod() {
    delete this.payload.addresses.shippingMethod;
  }

  /**
   * @method setShippingAddress(shippingAddress: CreateAddressPayload): void
   * Creates shipping address for the cart by a given address payload.
   */
  setShippingAddress(shippingAddress) {
    this.payload.addresses.shippingAddress = shippingAddress;
  }

  /**
   * @method setShippingAddressById(shippingAddressId: Number): void
   * Creates shipping address for the cart by a given address id.
   */
  setShippingAddressById(shippingAddressId) {
    this.payload.addresses.shippingAddress = {
      shippingAddressId,
    }
  }

  /**
   * @method updateShippingAddress(shippingAddress: UpdateAddressPayload): void
   * Updates shipping address for the cart.
   */
  updateShippingAddress(shippingAddress) {
    if (!this.payload.addresses.shippingAddress) {
      this.payload.addresses.shippingAddress = {};
    }
    Object.assign(this.payload.addresses.shippingAddress, shippingAddress)
  }

  /**
   * @method removeShippingAddress(): void
   * Removes a shipping address from the cart.
   */
  removeShippingAddress() {
    delete this.payload.addresses.shippingAddress;
  }

  /**
   * @method checkout(): void
   * Place order from cart.
   */
  checkout() {
    // @TODO
  }

  /**
   * @method updateQuantities(itemQuantities: ItemQuantities): void
   */
  updateQuantities(itemQuantities) {
    const newItems = _.flatMap(itemQuantities, (quantity, sku) => {
      const item = _.find(this.payload.lineItems, {sku});
      if (item) {
        item.quantity = quantity;
        return [];
      } else {
        return {
          sku,
          quantity,
        };
      }
    });

    this.payload.lineItems = [
      ...this.payload.lineItems,
      ...newItems
    ];
  }

  /**
   * @method updateQty(sku: String, qty: Number): void
   * Updates quantity for selected item in the cart
   */
  updateQty(sku, qty) {
    return this.updateQuantities({
      [sku]: qty
    });
  }

  /**
   * @method addSku(sku: String, quantity: Number): void
   * Adds sku by defined quantity in the cart.
   */
  addSku(sku, quantity) {
    const skuData = _.find(this.payload.lineItems, {sku});
    const existsQuantity = skuData ? skuData.quantity : 0;
    return this.updateQty(sku, existsQuantity + quantity);
  }

  /**
   * @method removeSku(sku: String): void
   * Removes selected sku from the cart.
   */
  removeSku(sku) {
    return this.updateQty(sku, 0);
  }

  /**
   * @method addCreditCard(creditCard: CreditCardCreatePayload): void
   * Adds a credit card as payment method for the cart.
   */
  addCreditCard(creditCard) {
    this.payload.payments.creditCard = creditCard;
  }

  /**
   * @method removeCreditCards(): void
   * Removes credit card from payment methods of the cart.
   */
  removeCreditCards() {
    delete this.payload.payments.creditCard;
  }

  /**
   * @method addGiftCard(giftCardPayload: GiftCardPaymentPayload): void
   * Adds a gift card as payment method for the cart.
   */
  addGiftCard(giftCardPayload) {
    this.payload.payments.giftCard = giftCardPayload;
  }

  /**
   * @method removeGiftCards(): void
   * Removes gift card from payment methods of the cart.
   */
  removeGiftCards() {
    delete this.payload.payments.giftCard;
  }

  /**
   * @method setCouponCode(code: String): void
   * Apply a coupon code for the cart.
   */
  setCouponCode(code) {
    this.payload.coupon = code;
  }

  /**
   * @method removeCoupon(): void
   * Remove a coupon code from the cart.
   */
  removeCoupon() {
    delete this.payload.coupon;
  }
}

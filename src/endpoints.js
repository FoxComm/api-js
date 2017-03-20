
const MAX_RESULTS = 1000;

export default Object.freeze({
  // auth
  login: '/v1/public/login',
  signup: '/v1/public/registrations/new',
  googleSignin: '/v1/public/signin/google/customer',
  logout: '/v1/public/logout',
  sendRestPassword: '/v1/public/send-password-reset',
  resetPassword: '/v1/public/reset-password',

  // product
  search: `/search/products_catalog_view/_search?size=${MAX_RESULTS}`,

  // cart
  cart: '/v1/my/cart',
  cartCheckout: '/v1/my/cart/checkout',
  shippingMethods: '/v1/my/cart/shipping-methods',
  shippingMethod: '/v1/my/cart/shipping-method',
  shippingAddress: '/v1/my/cart/shipping-address',
  shippingAddressId: id => `${shippingAddress}/${id}`,
  cartLineItems: '/v1/my/cart/line-items',
  cartPaymentCreditCarts: '/v1/my/cart/payment-methods/credit-cards',
  cartPaymentGiftCards: '/v1/my/cart/payment-methods/gift-cards',
  cartPaymentGiftCardsWithCode: giftCardCode => `/v1/my/cart/payment-methods/gift-cards/${giftCardCode}`,
  cartPaymentStoreCredits: '/v1/my/cart/payment-methods/store-credits',
  cartPaymentCouponCode: '/v1/my/cart/coupon',
  cartPaymentCouponCodeWithCode: code => `/v1/my/cart/coupon/${code}`,

  addToCart: '/v1/my/cart/add',
  removeFromCart: '/v1/my/cart/line-items/:id/edit',

  // address
  addresses: '/v1/my/addresses',
  address: addressId => `/v1/my/addresses/${addressId}`,
  addressDefault: addressId => `${address(addressId)}/default`,
  addressesDefault: '/v1/my/address/default',

  // payment methods, credit cards
  creditCards: '/v1/my/payment-methods/credit-cards',
  creditCard: creditCardId => `${creditCards}/${creditCardId}`,
  creditCardDefault: creditCardId => `${creditCard(creditCardId)}/default`,

  // payment methods, store credits
  storeCredit: storeCreditId => `/v1/my/payment-methods/store-credits/${storeCreditId}`,
  storeCreditTotals: `/v1/my/payment-methods/store-credits/totals`,
  storeCredits: `/search/store_credits_search_view/_search`,

  // account
  account: '/v1/my/account',
  changePassword: '/v1/my/account/change-password',

  // orders
  orders: '/v1/my/orders',
  order: referenceNumber => `/v1/my/orders/${referenceNumber}`,

  // analytics
  hal: '/v1/hal',

  customers: '/v1/customers',
  customer: customerId => `/v1/customers/${customerId}`,
  customerAddresses: customerId => `/v1/customers/${customerId}/addresses`,
  customerAddress: (customerId, addressId) => `/v1/customers/${customerId}/addresses/${addressId}`,
  customerCreditCards: customerId => `/v1/customers/${customerId}/payment-methods/credit-cards`,
  customerStoreCredit: customerId => `/v1/customers/${customerId}/payment-methods/store-credit`,
  customerGroups: '/v1/groups',
  customerGroup: groupId => `/v1/groups/${groupId}`,

  skus: context => `/v1/skus/${context}`,
  sku: (context, skuCode) => `/v1/skus/${context}/${skuCode}`,
  skuInventory: skuCode => `/v1/inventory/summary/${skuCode}`,

  products: context => `/v1/products/${context}`,
  product: (context, productId) => `/v1/products/${context}/${productId}`,

  productAlbums: (context, productId) => `/v1/products/${context}/${productId}/albums`,
  productAlbumPosition: (context, productId) => `/v1/products/${context}/${productId}/albums/position`,

  giftCards: '/v1/gift-cards',
  giftCard: giftCardCode => `/v1/gift-cards/${giftCardCode}`,

  promotions: context => `/v1/promotions/${context}`,
  promotion: (context, promotionId) => `/v1/promotions/${context}/${promotionId}`,

  coupons: context => `/v1/coupons/${context}`,
  coupon: (context, couponIdOrCode) => `/v1/coupons/${context}/${couponIdOrCode}`,
});

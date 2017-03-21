
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
  customerCart: '/v1/my/cart',
  customerCartCheckout: '/v1/my/cart/checkout',
  customerCartShippingMethods: '/v1/my/cart/shipping-methods',
  customerCartShippingMethod: '/v1/my/cart/shipping-method',
  customerCartShippingAddress: '/v1/my/cart/shipping-address',
  customerCartLineItems: '/v1/my/cart/line-items',
  customerCartPaymentCreditCards: '/v1/my/cart/payment-methods/credit-cards',
  customerCartPaymentGiftCards: '/v1/my/cart/payment-methods/gift-cards',
  customerCartPaymentGiftCardsWithCode: giftCardCode => `/v1/my/cart/payment-methods/gift-cards/${giftCardCode}`,
  customerCartPaymentStoreCredits: '/v1/my/cart/payment-methods/store-credits',
  customerCartPaymentCouponCode: '/v1/my/cart/coupon',
  customerCartPaymentCouponCodeWithCode: code => `/v1/my/cart/coupon/${code}`,
  shippingAddressId: id => `${shippingAddress}/${id}`,

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

  couponCodes: couponId => `/v1/coupons/codes/${couponId}`,
  couponCodesGenerate: couponId => `/v1/coupons/codes/generate/${couponId}`,

  albums: context => `/v1/albums/${context}`,
  album: (context, albumId) => `/v1/albums/${context}/${albumId}`,
  albumImages: (context, albumId) => `/v1/albums/${context}/${albumId}/images`,

  notes: (objectType, objectId) => `/v1/notes/${objectType}/${objectId}`,
  note: (objectType, objectId, noteId) => `/v1/notes/${objectType}/${objectId}/${noteId}`,

  cart: referenceNumber => `/v1/carts/${referenceNumber}`,
  cartLineItems: referenceNumber => `/v1/carts/${referenceNumber}/line-items`,
  cartWatchers: referenceNumber => `/v1/carts/${referenceNumber}/watchers`,
  cartWatcher: (referenceNumber, watcherId) => `/v1/carts/${referenceNumber}/watchers/${watcherId}`,
  cartShippingMethods: referenceNumber => `/v1/shipping-methods/${referenceNumber}`,
});

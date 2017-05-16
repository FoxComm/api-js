
const MAX_RESULTS = 1000;

// auth endpoints
export const login = '/v1/public/login';
export const signup ='/v1/public/registrations/new';
export const googleSignin = '/v1/public/signin/google/customer';
export const logout = '/v1/public/logout';
export const sendRestPassword = '/v1/public/send-password-reset';
export const resetPassword = '/v1/public/reset-password';

// product endpoints
export const search = `/search/products_catalog_view/_search?size=${MAX_RESULTS}`;

// cart endpoints
export const cart = '/v1/my/cart';
export const cartCheckout = '/v1/my/cart/checkout';
export const shippingMethods = '/v1/my/cart/shipping-methods';
export const shippingMethod = '/v1/my/cart/shipping-method';
export const shippingAddress = '/v1/my/cart/shipping-address';
export const shippingAddressId = id => `${shippingAddress}/${id}`;
export const cartLineItems = '/v1/my/cart/line-items';
export const cartPaymentCreditCarts = '/v1/my/cart/payment-methods/credit-cards';
export const cartPaymentGiftCards = '/v1/my/cart/payment-methods/gift-cards';
export const cartPaymentGiftCardsWithCode = giftCardCode => `/v1/my/cart/payment-methods/gift-cards/${giftCardCode}`;
export const cartPaymentStoreCredit = '/v1/my/cart/payment-methods/store-credit';
export const cartPaymentCouponCode = '/v1/my/cart/coupon';
export const cartPaymentCouponCodeWithCode = code => `/v1/my/cart/coupon/${code}`;

export const addToCart = '/v1/my/cart/add';

export const removeFromCart = '/v1/my/cart/line-items/:id/edit';

// address endpoints
export const addresses = '/v1/my/addresses';
export const address = addressId => `/v1/my/addresses/${addressId}`;
export const addressDefault = addressId => `${address(addressId)}/default`;
export const addressesDefault = '/v1/my/address/default';

// payment methods, credit cards
export const creditCards = '/v1/my/payment-methods/credit-cards';
export const creditCard = creditCardId => `${creditCards}/${creditCardId}`;
export const creditCardDefault = creditCardId => `${creditCard(creditCardId)}/default`;

// payment methods, store credits
export const storeCredit = storeCreditId => `/v1/my/payment-methods/store-credits/${storeCreditId}`;
export const storeCreditTotals = `/v1/my/payment-methods/store-credits/totals`;
export const storeCredits = `/search/store_credits_search_view/_search`;

// account endpoints
export const account = '/v1/my/account';
export const changePassword = '/v1/my/account/change-password';

// orders endpoints
export const orders = '/v1/my/orders';
export const order = referenceNumber => `/v1/my/orders/${referenceNumber}`;

// review endpoints
export const reviews = '/v1/my/review';
export const review = reviewId => `/v1/my/review/${reviewId}`;
export const reviewSearch = size => `/search/public/product_reviews_search_view/_search?size=${size}`;

// analytics endpoints
export const hal = '/v1/hal';

// cross-sell endpoints
export const crossSellTrain = '/v1/public/recommend/prod-prod/train';
export const crossSellRelated = '/v1/public/recommend/prod-prod/';
export const crossSellRelatedFull = '/v1/public/recommend/prod-prod/full/';

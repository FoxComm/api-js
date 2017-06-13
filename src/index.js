/*
 * @class FoxApi
 * Javascript Library for interacting with FoxCommerce API
 *
 * @example
 *
 * ```js
 * const api = new FoxApi({api_url: 'http://api.foxcommerce', stripe_key: 'abcdef1234567890'});
 * api.products.search({state: 'cart'});
 * ```
 */

import _ from 'lodash';
import request from './utils/request';
import jwtDecode from 'jwt-decode';
import { isBrowser, loadScript } from './utils/browser';

import Addresses from './api/adresses';
import Auth from './api/auth';
import CreditCards from './api/credit-cards';
import StoreCredits from './api/store-credits';
import Cart from './api/cart';
import Account from './api/account';
import Orders from './api/orders';
import Reviews from './api/reviews';
import Analytics from './api/analytics';
import CrossSell from './api/cross-sell';
import ApplePay from './api/apple-pay';

export default class Api {
  constructor(args) {
    // @option api_url: String
    // Required option. Should point to phoenix backend.
    if (!args.api_url) throw new Error('You must specify an API URL');

    // @option stripe_key: String
    // Required option. Should contain Stripe.js publishable key. https://stripe.com/docs/stripe.js#setting-publishable-key
    if (!args.stripe_key) throw new Error('You must specify stripe publishable key. See https://stripe.com/docs/stripe.js#setting-publishable-key');

    this.api_url = args.api_url.replace(/\/?$/, ''); // ensure no trailing slash
    this.stripe_key = args.stripe_key;

    // could be passed superagent or supertest instance
    this.agent = args.agent || require('superagent');

    // add the stripe.js script if in the browser
    let stripeLoaded = Promise.resolve();

    if (isBrowser()) {
      stripeLoaded = loadScript('https://js.stripe.com/v2/').then(() => {
        Stripe.setPublishableKey(this.stripe_key);
      });
    }

    // @property addresses: Addresses
    // Addresses instance
    this.addresses = new Addresses(this);

    // @property auth: Auth
    // Auth instance
    this.auth = new Auth(this);

    // @property applePay: ApplePay
    // ApplePay instance
    this.applePay = new ApplePay(this, stripeLoaded);

    // @property storeCredits: StoreCredits
    // StoreCredits instance
    this.storeCredits = new StoreCredits(this);

    // @property creditCards: CreditCards
    // CreditCards instance
    this.creditCards = new CreditCards(this);

    // @property cart: Cart
    // Cart instance
    this.cart = new Cart(this);

    // @property account: Account
    // Account instance
    this.account = new Account(this);

    // @property orders: Orders
    // Orders instance
    this.orders = new Orders(this);

    // @property reviews: Reviews
    // Reviews instance
    this.reviews = new Reviews(this);

    // @property analytics: Analytics
    // Analytics instance
    this.analytics = new Analytics(this);

    // @property crossSell: CrossSell
    // CrossSell instance
    this.crossSell = new CrossSell(this);
  }

  // @method addAuth(jwt: String): FoxApi
  // Set jwt authorization header for next requests
  addAuth(jwt) {
    if (jwt) {
      this._jwt = jwt;
      this.headers = {
        ...this.headers,
        JWT: jwt,
      };
    }
    return this;
  }

  // @method removeAuth(): FoxApi
  // Removes jwt authorization header
  removeAuth() {
    this.headers = _.omit(this.headers, 'JWT');
    this._jwt = null;
    return this;
  }

  // @method getCustomerId(): Number|null
  // Returns customer id from parsed jwt string
  // You can define jwt string via `addAuth` method, if there is no jwt strings method returns null.
  getCustomerId() {
    if (this._jwt) {
      try {
        return jwtDecode(this._jwt).id;
      } catch (e) {
        return null; // no error handling?
      }
    }
    return null;
  }

  // @method setHeaders(headers: Object): FoxApi
  // Set http headers for next requests
  setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  // @method addHeaders(headers: Object): FoxApi
  // Add new http headers for next requests
  addHeaders(headers) {
    this.headers = Object.assign(this.headers || {}, headers);
    return this;
  }

  // @method uri(uri: String): String
  // Prepares and returns final url which will be used in request.
  uri(uri) {
    return `${this.api_url}${uri}`;
  }

  idOrSlugToArgs(id) {
    return Number.isInteger(id) ? { id } : { slug: id };
  }

  queryStringToObject(q) {
    // convoluted 1-liner instead of forloop [probably less performant too, but for loops kill me]
    return q.split('&').reduce(function(acc, n) {
      const lines = n.split('=');
      acc[lines[0]] = lines[1];
      return acc;
    }, {});
  }

  // Request Methods

  // @method request(method: String, uri: String, data?: Object, options?: Object): Promise
  // Makes http request, possible options:
  // - headers: headers to sent
  request(method, uri, data, options = {}) {
    const finalUrl = this.uri(uri);
    const requestOptions = options;
    if (this.headers) {
      requestOptions.headers = {
        ...this.headers,
        ...(options.headers || {}),
      };
    }

    requestOptions.agent = this.agent;

    return request(method, finalUrl, data, requestOptions);
  }

  // @method get(uri: String, data?: Object, options?: Object): Promise
  // Makes GET http request
  get(...args) {
    return this.request('get', ...args);
  }

  // @method post(uri: String, data?: Object, options?: Object): Promise
  // Makes POST http request
  post(...args) {
    return this.request('post', ...args);
  }

  // @method patch(uri: String, data?: Object, options?: Object): Promise
  // Makes PATCH http request
  patch(...args) {
    return this.request('patch', ...args);
  }

  // @method put(uri: String, data?: Object, options?: Object): Promise
  // Makes PUT http request
  put(...args) {
    return this.request('put', ...args);
  }

  // @method delete(uri: String, data?: Object, options?: Object): Promise
  // Makes DELETE http request
  delete(...args) {
    return this.request('delete', ...args);
  }
}

// @namespace Utils

// @method parseError(err: ResponseOrError): Array<string>
// Retrieves errors from api-js rejected promise.
// In case if err is Error itself returns array of single element - that error as a string.
export function parseError(err) {
  if (!err) return null;

  return _.get(err, ['responseJson', 'errors'], [err.toString()]);
}

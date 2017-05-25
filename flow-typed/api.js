
declare module '@foxcomm/api-js' {
  declare type StringDict = {[name: string]: string};

  declare type AbortablePromise = Promise & {
    abort(): void;
  };

  declare type AgentLike = AbortablePromise & {
    get(url: string): AgentLike;
    post(url: string): AgentLike;
    patch(url: string): AgentLike;
    delete(url: string): AgentLike;

    set(headers: StringDict): AgentLike;
    withCredentials(): AgentLike;
  };

  declare type RequestOptions = {
    headers?: StringDict,
    credentials?: string,
    agent?: AgentLike;
  };

  // @TODO: add subclasses
  declare class ApiClass {
    addresses: mixed;
    auth: mixed;
    creditCards: mixed;
    storeCredits: mixed;
    cart: mixed;
    account: mixed;
    orders: mixed;
    reviews: mixed;
    analytics: mixed;
    crossSell: mixed;

    addAuth(jwt: string): ApiClass;
    removeAuth(): ApiClass;

    // Returns customer id from parsed jwt string
    // You can define jwt string via `addAuth` method, if there is no jwt strings method returns null.
    getCustomerId(): ?number;

    setHeaders(headers: StringDict): ApiClass;
    addHeaders(headers: StringDict): ApiClass;
    uri(path: string): string;
    queryStringToObject(qs: string): StringDict;

    request(method: string, uri: string, data: ?Object, options: ?RequestOptions): AbortablePromise;
    get(uri: string, data: ?Object, options: ?Object): AbortablePromise;
    post(uri: string, data: ?Object, options: ?Object): AbortablePromise;
    patch(uri: string, data: ?Object, options: ?Object): AbortablePromise;
    delete(uri: string, data: ?Object, options: ?Object): AbortablePromise;
  }

  declare function parseError(err: mixed): Array<string>;

  declare module.exports: typeof ApiClass;
}

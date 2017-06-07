type ApplePay = {
  checkAvailability: ((available: boolean) => void) => void,
  buildSession:(
    paymentRequest: Object,
    (result: Object, completion: (status: number) => void) => void,
    (err: mixed) => void,
  ) => Object,
};

declare class Stripe {
  static setPublishableKey(key: string): void;
  static applePay: ApplePay;
}

declare var Stripe: Stripe;

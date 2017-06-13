type ApplePay = {
  checkAvailability: ((available: boolean) => void) => void,
  buildSession:(
    paymentRequest: Object,
    (result: Object, completion: (status: number) => void) => void,
    (err: mixed) => void,
  ) => Object,
};

type StripeT = {
  setPublishableKey: (key: string) => void;
  applePay: ApplePay;
};

declare var Stripe: StripeT;

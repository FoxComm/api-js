
export type Currency = {|
  t: 'price',
  v: {
    currency: string,
    value: number
  }
|};

export type String = {|
  t: 'string',
  v: string
|};

export type Context = {|
  name: string,
  attributes: {
    lang: string,
    modality: string,
  },
|};

export type Attributes = {
  [name: string]: any,
};

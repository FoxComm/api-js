import type { Context } from './base';
import type { String } from './attrs';
import type { Sku } from './sku';
import type { Album } from './album';

export type VariantValue = {
  id: number,
  name: string,
  swatch: string,
  skuCodes: Array<string>,
};

export type Variant = {
  attributes: {
    name: String,
  },
  values: Array<VariantValue>,
};

export type Product = {
  id: number,
  context: Context,
  albums: Array<Album>,
  skus: Array<Sku>,
  attributes: {
    name: String,
    description: String,
  },
  variants: Array<Variant>,
};

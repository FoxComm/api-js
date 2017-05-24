
import type { Context } from './base';
import type { Currency, String } from './attrs';
import type { Album } from './album';

export type Sku = {
  id: number,
  context: Context,
  attributes: {
    code: String,
    salePrice: Currency,
    retailPrice: Currency,
  },
  albums: Array<Album>,
};


import type { Album } from './album';
import type { Taxonomy } from './taxonomy';

export type Product = {
  id: number,
  productId: number,
  slug: ?string,
  context: string,
  currency: string,
  title: string,
  description: ?string,
  salePrice: string,
  retailPrice: string,
  currency: string,
  albums: ?Array<Album> | Object,
  skus: Array<string>,
  tags?: Array<string>,
  scope?: string,
  taxonomies: Array<Taxonomy>,
};


export type Image = {
  alt?: string,
  src: string,
  title?: string,
  baseurl?: string,
};

export type Album = {
  name: string,
  images: Array<Image>,
};

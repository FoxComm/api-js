
export type Image = {
  alt: string,
  src: string,
  title?: string,
}

export type Album = {
  id: number,
  name: string,
  images: Array<Image>,
  archivedAt?: string,
}

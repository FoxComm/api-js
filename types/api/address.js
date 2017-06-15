export type Region = {
  id: number,
  countryId: number,
  name: string,
};

export type Address = {
  address1: string,
  address2?: string,
  city: string,
  id: number,
  name: string,
  phoneNumber: string,
  region: Region,
  zip: string,
};

export type CreateAddressPayload = {
  name: string,
  regionId: number,
  address1: string,
  address2?: string,
  city: String,
  zip: String,
  isDefault: boolean,
  phoneNumber?: string,
};

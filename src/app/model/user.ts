export interface User extends Contact {
  id: number;
  shippingAddress: Address;
  useDualAddress: boolean;
  billingAddress: Address;
}

export interface Contact {
  sex: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  birthday: Date;
  phoneNumber: string;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

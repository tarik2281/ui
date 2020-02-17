import { Address, Contact } from 'src/app/model/user';

export interface Order extends Contact {
  id: number;
  userId: number;
  shippingAddress: Address;
  useDualAddress: boolean;
  billingAddress: Address;
  entries: OrderEntry[];
  state: string;
  orderDate: Date;
}

export interface OrderEntry {
  productVariantId: number;
  amount: number;
  price?: number;
}

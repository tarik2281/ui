import { Injectable } from '@angular/core';
import { Address, Contact } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  contactInformation: Contact;
  shippingAddress: Address;
  billingAddress: Address;

  constructor() { }
}

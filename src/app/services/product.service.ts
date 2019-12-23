import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAllProducts() {
    return [
      {
        id: 1,
        name: 'Product1',
        price: '4.99€'
      },
      {
        id: 2,
        name: 'Product2',
        price: '16.99€'
      }
    ];
  }
}

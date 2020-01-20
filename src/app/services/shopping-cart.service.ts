import {Injectable} from '@angular/core';
import {Product} from 'src/app/model/product';


interface ProductEntry {
  product: Product;
  amount: number;
}

interface ShoppingCart {
  products: ProductEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: ShoppingCart;

  constructor() {
    this.shoppingCart = { products: [] };
  }

  addProduct(product: Product) {
    this.shoppingCart.products.push({product, amount: 1});
  }

  removeProduct(product: Product) {
    const index = this.shoppingCart.products.findIndex((value) => value.product.id === product.id);
    this.shoppingCart.products.splice(index, 1);
  }
}

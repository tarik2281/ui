import { Injectable } from '@angular/core';
import { Product, ProductVariant } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';


interface ProductEntry {
  product: ProductVariant;
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

  constructor(private productService: ProductService) {
    this.shoppingCart = { products: [] };
    this.loadFromStorage();
  }

  addProduct(product: ProductVariant) {
    this.shoppingCart.products.push({ product, amount: 1 });
    this.saveInStorage();
  }

  removeProduct(product: ProductVariant) {
    const index = this.shoppingCart.products.findIndex((value) => value.product.id === product.id);
    this.shoppingCart.products.splice(index, 1);
  }

  isInCart(product: ProductVariant) {
    return !!this.shoppingCart.products.find(value => value.product.id === product.id);
  }

  getShippingFee() {
    return 4.99;
  }

  calculateProductSum() {
    let sum = 0;
    for (const entry of this.shoppingCart.products) {
      sum += entry.amount * entry.product.price;
    }
    return sum;
  }

  calculateTotalSum() {
    return this.calculateProductSum() + this.getShippingFee();
  }

  calculateTaxes() {
    const sum = this.calculateProductSum();
    return (sum - sum / 1.19).toFixed(2);
  }

  saveInStorage() {
    const storageProducts = [];
    for (const product of this.shoppingCart.products) {
      storageProducts.push({ id: product.product.id, amount: product.amount });
    }

    localStorage.setItem('shopping_cart', JSON.stringify(storageProducts));
  }

  loadFromStorage() {
    this.productService.getAllProducts().subscribe(products => {
      const storageProducts = JSON.parse(localStorage.getItem('shopping_cart'));

      root: for (const storageProduct of storageProducts) {

        for (const product of products) {

          for (const variant of product.variants) {

            if (variant.id === storageProduct.id) {
              this.shoppingCart.products.push({ product: variant, amount: storageProduct.amount });
              continue root;
            }

          }

        }

      }
    });
  }
}

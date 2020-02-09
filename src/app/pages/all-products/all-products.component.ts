import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService,
              private cartService: ShoppingCartService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }

  isInCart(product: Product) {
    return this.cartService.isInCart(product.variants[0]);
    // return this.addedToCart;
    // return this.cartService.isInCart(this.product);
  }

  addToCart(product: Product) {
    // if (!this.addedToCart) {
    //   this.addedToCart = true;
    this.cartService.addProduct(product.variants[0]);
    this.snackBar.open('Artikel zum Warenkorb hinzugefügt!', null, {
      duration: 2000
    });
    // }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId = 0;
  product: Product;

  constructor(private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    });

    console.log('requested product id', this.productId);
  }

  addToCart() {
    this.cartService.addProduct(this.product);
    this.snackBar.open('Artikel zum Warenkorb hinzugefügt!', null, {
      duration: 2000
    });
  }
}

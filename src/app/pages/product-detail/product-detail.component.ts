import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  addedToCart = false;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addToCart() {
    if (!this.addedToCart) {
      console.log('adding product to cart');
      this.addedToCart = true;
      this.snackBar.open('Artikel zum Warenkorb hinzugefügt!', null, {
        duration: 2000
      });
    }
  }
}

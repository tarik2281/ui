import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductVariant } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // addedToCart = false;
  productId: string;

  product: Product;
  currentVariantIndex = 0;
  // currentVariant: ProductVariant;
  currentImage: string;
  smallImage = false;

  get currentVariant() {
    return this.product.variants[this.currentVariantIndex];
  }

  constructor(private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    //
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;
      // this.currentVariant = data.variants[0];
      this.currentImage = this.currentVariant.images[0];

      console.log(this.product);
      console.log(this.currentVariant);
    });
    //
    // console.log('requested product id', this.productId);
  }

  setImage(img: HTMLImageElement) {
    this.smallImage = this.shouldMakeSmall(img);
    this.currentImage = img.src;
  }

  imageLoaded(img: HTMLImageElement) {
    this.smallImage = this.shouldMakeSmall(img);
    console.log('image loaded')
  }

  updateVariant(event) {
    // console.log(event);
    this.currentImage = this.currentVariant.images[0];
    // this.setImage(this.currentVariant.images[0]);
  }

  isInCart() {
    return this.cartService.isInCart(this.currentVariant);
    // return this.addedToCart;
    // return this.cartService.isInCart(this.product);
  }

  addToCart() {
    // if (!this.addedToCart) {
    //   this.addedToCart = true;
      this.cartService.addProduct(this.currentVariant);
      this.snackBar.open('Artikel zum Warenkorb hinzugefügt!', null, {
        duration: 2000
      });
    // }
  }

  shouldMakeSmall(image: HTMLImageElement) {
    const max = Math.max(image.naturalWidth, image.naturalHeight);
    return max <= 200;
  }
}

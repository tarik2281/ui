import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/model/product';
import { of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  products: Product[];

  getAllProducts() {
    if (this.products) {
      return of(this.products);
    } else {
      return this.http.get<Product[]>('/api/products').pipe(
        tap(products => {
          this.products = products;
        })
      );
    }

    // return this.http.get<Product[]>('/api/products').pipe();
  }

  getProductById(id: string) {
    if (this.products) {
      return of(this.products.find(value => value.idString === id));
    } else {
      return this.getAllProducts().pipe(
        map(products =>  products.find(value => value.idString === id))
      );
    }

    // return this.http.get<Product>('/api/products/' + id);
  }
}

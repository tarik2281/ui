import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get<Product[]>('/api/products');
  }

  getProductById(id: number) {
    return this.http.get<Product>('/api/products/' + id);
  }
}

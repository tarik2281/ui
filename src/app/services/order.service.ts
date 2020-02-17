import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: Order) {
    return this.http.post('/api/order/place', order);
  }

  cancelOrder(orderId: number) {
    return this.http.post('/api/order/cancel', orderId);
  }

  getOrders() {
    return this.http.get<Order[]>('/api/orders');
  }
}

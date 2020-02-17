import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/model/order';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material';
import { OrderCancelDialogComponent } from 'src/app/manage-account/order-cancel-dialog/order-cancel-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService,
              public productService: ProductService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateOrders();
  }

  updateOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  calculateSum(order: Order) {
    let sum = 4.99;

    for (const entry of order.entries) {
      sum += entry.amount * entry.price;
    }

    return sum;
  }

  cancelOrder(order: Order) {
    this.dialog.open(OrderCancelDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.orderService.cancelOrder(order.id).subscribe(() => {
          this.updateOrders();
        });
      }
    });
  }
}

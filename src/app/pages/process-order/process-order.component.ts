import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { Address, Contact } from 'src/app/model/user';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material';
import { OrderCompleteDialogComponent } from 'src/app/components/order-complete-dialog/order-complete-dialog.component';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {

  contact: Contact;
  shippingAddress: Address;
  useDualAddress: boolean;
  billingAddress: Address;

  constructor(public cartService: ShoppingCartService,
              public orderDataService: OrderDataService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private orderService: OrderService,
              private dialog: MatDialog) {
    this.contact = orderDataService.contactInformation;
    this.shippingAddress = orderDataService.shippingAddress;
    this.useDualAddress = orderDataService.useDualAddress;
    this.billingAddress = orderDataService.billingAddress;

    if (!this.contact || !this.shippingAddress || !this.billingAddress) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  placeOrder() {
    // @ts-ignore
    const order: Order = Object.assign({}, this.contact);

    if (this.authenticationService.isAuthenticated()) {
      order.userId = this.authenticationService.getUser().id;
    }

    order.shippingAddress = Object.assign({}, this.shippingAddress);
    order.billingAddress = Object.assign({}, this.billingAddress);
    order.useDualAddress = this.useDualAddress;
    order.entries = [];

    for (const entry of this.cartService.shoppingCart.products) {
      order.entries.push({
        productVariantId: entry.product.id,
        amount: entry.amount
      });
    }

    this.orderService.placeOrder(order).subscribe(() => {
      this.router.navigate(['/']);
      this.cartService.clearCart();

      this.dialog.open(OrderCompleteDialogComponent);
    });
  }

}

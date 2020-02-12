import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { Address, Contact } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {

  contact: Contact;
  shippingAddress: Address;
  billingAddress: Address;

  constructor(public cartService: ShoppingCartService,
              public orderDataService: OrderDataService,
              private router: Router) {
    this.contact = orderDataService.contactInformation;
    this.shippingAddress = orderDataService.shippingAddress;
    this.billingAddress = orderDataService.billingAddress;

    if (!this.contact || !this.shippingAddress || !this.billingAddress) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}

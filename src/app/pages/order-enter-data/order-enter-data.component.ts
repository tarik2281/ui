import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-order-enter-data',
  templateUrl: './order-enter-data.component.html',
  styleUrls: ['./order-enter-data.component.scss']
})
export class OrderEnterDataComponent implements OnInit {

  updateForm = new FormGroup({ });
  showContactForm = true;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public orderDataService: OrderDataService) {
  }

  ngOnInit() {

    if (this.authenticationService.isAuthenticated()) {
      if (this.authenticationService.hasAddressData()) {
        this.router.navigate(['/process-order']);
        return;
      }

      this.showContactForm = false;
    }

    if (this.orderDataService.contactInformation && !this.route.snapshot.queryParams.edit) {
      this.router.navigate(['/process-order']);
      return;
    }
  }

  onSubmit() {
    console.log(this.updateForm);

    if (this.updateForm.valid) {
      const result = this.updateForm.value;

      if (this.showContactForm) {
        this.orderDataService.contactInformation = {
          sex: result.sex,
          firstName: result.firstName,
          lastName: result.lastName,
          birthday: result.birthday,
          emailAddress: result.emailAddress,
          phoneNumber: result.phoneNumber
        };
      } else {
        this.authenticationService.me().subscribe(user => {
          this.orderDataService.contactInformation = {
            sex: user.sex,
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber
          };
        });
      }

      this.orderDataService.shippingAddress = {
        street: result.shippingAddress.address,
        postalCode: result.shippingAddress.postalCode,
        city: result.shippingAddress.city,
        country: result.shippingAddress.country
      };

      if (result.useDualAddress) {
        this.orderDataService.billingAddress = this.orderDataService.shippingAddress;
      } else {
        this.orderDataService.billingAddress = {
          street: result.billingAddress.address,
          postalCode: result.billingAddress.postalCode,
          city: result.billingAddress.city,
          country: result.billingAddress.country
        };
      }

      this.router.navigate(['/process-order']);
    }
  }
}

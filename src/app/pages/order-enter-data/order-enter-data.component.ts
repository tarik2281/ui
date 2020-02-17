import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-order-enter-data',
  templateUrl: './order-enter-data.component.html',
  styleUrls: ['./order-enter-data.component.scss']
})
export class OrderEnterDataComponent implements OnInit {

  updateForm = new FormGroup({});
  showContactForm = true;
  forceEdit = false;
  user: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public orderDataService: OrderDataService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.forceEdit = this.route.snapshot.queryParams.edit;

    if (this.authenticationService.isAuthenticated() && !this.forceEdit) {
      this.user = this.authenticationService.getUser();

      if (this.authenticationService.hasAddressData()) {
        this.setContactFromUser();
        this.setAddressFromUser();
        this.router.navigate(['/process-order']);
        return;
      }

      this.showContactForm = false;
    }

    if (this.orderDataService.contactInformation && !this.forceEdit) {
      this.router.navigate(['/process-order']);
      return;
    }
  }

  setContactFromUser() {
    this.orderDataService.contactInformation = {
      sex: this.user.sex,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthday: this.user.birthday,
      emailAddress: this.user.emailAddress,
      phoneNumber: this.user.phoneNumber
    };
  }

  setAddressFromUser() {
    this.orderDataService.shippingAddress = Object.assign([], this.user.shippingAddress);
    this.orderDataService.useDualAddress = this.user.useDualAddress;

    if (this.user.useDualAddress) {
      this.orderDataService.billingAddress = Object.assign([], this.user.shippingAddress);
    } else {
      this.orderDataService.billingAddress = Object.assign([], this.user.billingAddress);
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
        this.setContactFromUser();
      }

      this.orderDataService.shippingAddress = {
        street: result.shippingAddress.street,
        postalCode: result.shippingAddress.postalCode,
        city: result.shippingAddress.city,
        country: result.shippingAddress.country
      };

      this.orderDataService.useDualAddress = result.useDualAddress;

      if (result.useDualAddress) {
        this.orderDataService.billingAddress = Object.assign([], this.orderDataService.shippingAddress);
      } else {
        this.orderDataService.billingAddress = {
          street: result.billingAddress.street,
          postalCode: result.billingAddress.postalCode,
          city: result.billingAddress.city,
          country: result.billingAddress.country
        };
      }

      if (this.authenticationService.isAuthenticated() && !this.forceEdit) {
        const newUser = Object.assign({}, this.user);
        newUser.shippingAddress = Object.assign({}, this.orderDataService.shippingAddress);
        newUser.useDualAddress = this.orderDataService.useDualAddress;
        newUser.billingAddress = Object.assign({}, this.orderDataService.billingAddress);
        this.userService.update(newUser).subscribe(() => {
          this.authenticationService.refreshMe();
        });
      }

      this.router.navigate(['/process-order']);
    }
  }
}

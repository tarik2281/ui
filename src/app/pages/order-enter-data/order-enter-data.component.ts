import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { conditionalRequired } from 'src/app/shared/validators/match-validator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-order-enter-data',
  templateUrl: './order-enter-data.component.html',
  styleUrls: ['./order-enter-data.component.scss']
})
export class OrderEnterDataComponent implements OnInit {

  updateForm: FormGroup;
  billingAddress: FormGroup;
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

    const useDualAddress = new FormControl(true, []);
    useDualAddress.valueChanges.subscribe(value => {
      this.billingAddress.controls.address.setErrors(null);
      this.billingAddress.controls.postalCode.setErrors(null);
      this.billingAddress.controls.city.setErrors(null);
      this.billingAddress.controls.country.setErrors(null);
    });

    // this.contact = new FormGroup({
    //   sex: new FormControl('', [Validators.required]),
    //   firstName: new FormControl('', [Validators.required]),
    //   lastName: new FormControl('', [Validators.required]),
    //   birthday: new FormControl('', [Validators.required]),
    //   phoneNumber: new FormControl('', []),
    //   emailAddress: new FormControl('', [Validators.required])
    // });

    this.billingAddress =  new FormGroup({
      address: new FormControl('', [conditionalRequired(useDualAddress, true)]),
      postalCode: new FormControl('', [conditionalRequired(useDualAddress, true)]),
      city: new FormControl('', [conditionalRequired(useDualAddress, true)]),
      country: new FormControl('', [conditionalRequired(useDualAddress, true)]),
    });

    this.updateForm = new FormGroup({
      shippingAddress: new FormGroup({
        address: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      }),
      useDualAddress,
      billingAddress: this.billingAddress
    });

    // if (this.showContactForm) {
    //   this.updateForm.addControl('contact', this.contact);
    // }
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

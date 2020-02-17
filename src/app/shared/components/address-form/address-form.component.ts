import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Address } from 'src/app/model/user';

function setRequiredValidator(formCtrl: AbstractControl, required: boolean) {
  formCtrl.setValidators(required ? Validators.required : null);
  formCtrl.updateValueAndValidity({ emitEvent: false });
}

function setRequiredValidatorGroup(formGroup: FormGroup, required: boolean) {
  setRequiredValidator(formGroup.controls.street, required);
  setRequiredValidator(formGroup.controls.postalCode, required);
  setRequiredValidator(formGroup.controls.city, required);
  setRequiredValidator(formGroup.controls.country, required);
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class AddressFormComponent implements OnInit {

  @Input()
  required = true;

  @Input()
  shippingAddress: Address;

  @Input()
  useDualAddress = true;

  @Input()
  billingAddress: Address;

  shippingAddressCtrl: FormGroup;
  dualAddressCtrl: FormControl;
  billingAddressCtrl: FormGroup;

  constructor(private controlContainer: FormGroupDirective) {
  }

  formHasValue(value: Address) {
    return !!value.street || !!value.postalCode || !!value.city || !!value.country;
  }

  ngOnInit() {
    const mainForm = this.controlContainer.form;

    this.shippingAddressCtrl = new FormGroup({
      street: new FormControl(this.getProperty(this.shippingAddress, 'street'), [Validators.required]),
      postalCode: new FormControl(this.getProperty(this.shippingAddress, 'postalCode'), [Validators.required]),
      city: new FormControl(this.getProperty(this.shippingAddress, 'city'), [Validators.required]),
      country: new FormControl(this.getProperty(this.shippingAddress, 'country'), [Validators.required])
    });
    this.dualAddressCtrl = new FormControl(this.useDualAddress, []);
    this.billingAddressCtrl = new FormGroup({
      street: new FormControl(this.getProperty(this.billingAddress, 'street'), null),
      postalCode: new FormControl(this.getProperty(this.billingAddress, 'postalCode'), null),
      city: new FormControl(this.getProperty(this.billingAddress, 'city'), null),
      country: new FormControl(this.getProperty(this.billingAddress, 'country'), null)
    });

    if (!this.required) {
      if (!this.formHasValue(this.shippingAddressCtrl.value)) {
        setRequiredValidatorGroup(this.shippingAddressCtrl, false);
      }

      this.shippingAddressCtrl.valueChanges.subscribe(value => {
        const required = this.formHasValue(value);

        setRequiredValidatorGroup(this.shippingAddressCtrl, required);
      });
    }

    this.dualAddressCtrl.valueChanges.subscribe(value => {
      setRequiredValidatorGroup(this.billingAddressCtrl, !value);
    });

    mainForm.addControl('shippingAddress', this.shippingAddressCtrl);
    mainForm.addControl('useDualAddress', this.dualAddressCtrl);
    mainForm.addControl('billingAddress', this.billingAddressCtrl);
  }

  getProperty(object, property: string) {
    if (object) {
      return object[property];
    }

    return '';
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/user';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class ContactFormComponent implements OnInit {

  @Input()
  contact: Contact;

  @Input()
  showPhoneNumber = true;

  constructor(private controlContainer: FormGroupDirective) {
  }

  ngOnInit() {
    const formGroup = this.controlContainer.form;

    formGroup.addControl('sex', new FormControl(this.getProperty('sex'), [Validators.required]));
    formGroup.addControl('firstName', new FormControl(this.getProperty('firstName'), [Validators.required]));
    formGroup.addControl('lastName', new FormControl(this.getProperty('lastName'), [Validators.required]));
    formGroup.addControl('birthday', new FormControl(this.getProperty('birthday'), [Validators.required]));
    formGroup.addControl('emailAddress', new FormControl(this.getProperty('emailAddress'), [Validators.required, Validators.email]));

    if (this.showPhoneNumber) {
      formGroup.addControl('phoneNumber', new FormControl(this.getProperty('phoneNumber'), [Validators.required]));
    }
  }

  getProperty(property: string) {
    if (this.contact) {
      return this.contact[property];
    }

    return '';
  }
}

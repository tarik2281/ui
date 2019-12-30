import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      sex: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', []),
      emailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      confirmTos: new FormControl('', [Validators.requiredTrue]),
      newsletter: new FormControl('true', [])
    });
  }

  registerUser() {
    console.log(this.registerForm);
  }

  openTosDialog() {
    console.log("open dialog");
  }
}

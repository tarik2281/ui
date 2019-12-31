import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from 'src/app/services/authentication.service';

function matchValidator(target: FormControl): ValidatorFn {
  return (c: FormControl): ValidationErrors | null => {
    if (target.value === c.value) {
      return null;
    } else {
      return {match: {valid: false}};
    }
  };
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;

  passwordControl: FormControl;
  confirmPasswordControl: FormControl;
  confirmTos: FormControl;
  submitError: string = null;

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.passwordControl = new FormControl('', [Validators.required]);
    this.confirmPasswordControl = new FormControl('', [Validators.required, matchValidator(this.passwordControl)]);
    this.confirmTos = new FormControl(false, [Validators.requiredTrue]);

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
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
      confirmTos: this.confirmTos,
      newsletter: new FormControl(true, [])
    });
  }

  registerUser() {
    this.confirmTos.markAsDirty();

    if (this.passwordControl.value !== this.confirmPasswordControl.value) {
      this.confirmPasswordControl.setErrors({match: {valid: false}});
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.submitError = null;
    this.registerForm.disable();
    this.userService.register(this.registerForm.value).subscribe(result => {
      console.log(result);
      this.router.navigate(['/']);
      this.snackBar.open('Konto erfolgreich erstellt!', 'OK', {
        duration: 2000
      });
      this.authenticationService.login(this.registerForm.controls.emailAddress.value, this.passwordControl.value);
    }, error => {
      this.registerForm.enable();
      console.log(error);
      this.submitError = error.error.message;
    });
  }

  openTosDialog() {
    console.log('open dialog');
  }
}

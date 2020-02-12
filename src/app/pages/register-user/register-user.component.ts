import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {TosDialogComponent} from 'src/app/components/tos-dialog/tos-dialog.component';
import { NewPasswordFormComponent } from 'src/app/shared/components/new-password-form/new-password-form.component';

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
              private authenticationService: AuthenticationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.confirmTos = new FormControl(false, [Validators.requiredTrue]);

    this.registerForm = new FormGroup({
      sex: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', []),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
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
    this.dialog.open(TosDialogComponent);
    console.log('open dialog');
  }
}

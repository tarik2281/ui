import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TosDialogComponent } from 'src/app/components/tos-dialog/tos-dialog.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;
  proceedToOrder = false;

  confirmTos: FormControl;

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.proceedToOrder = !!queryParams.proceedToOrder;
    });

    this.confirmTos = new FormControl(false, [Validators.requiredTrue]);

    this.registerForm = new FormGroup({
      confirmTos: this.confirmTos,
      newsletter: new FormControl(true, [])
    });
  }

  registerUser() {
    this.confirmTos.markAsDirty();

    if (this.registerForm.controls.newPassword.value !== this.registerForm.controls.confirmNewPassword.value) {
      this.registerForm.controls.confirmNewPassword.setErrors({ match: true });
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.disable();

    const formData = this.registerForm.value;

    this.userService.register(formData).subscribe(result => {
      this.snackBar.open('Konto erfolgreich erstellt!', 'OK', {
        duration: 2000
      });

      this.authenticationService.login(formData.emailAddress, formData.newPassword).subscribe(() => {
        this.proceed();
      });
    }, error => {
      this.registerForm.enable();

      if (error.error.message === 'email-already-exists') {
        this.registerForm.controls.emailAddress.setErrors({ alreadyExists: true });
      }
    });
  }

  openTosDialog() {
    this.dialog.open(TosDialogComponent);
  }

  proceed() {
    if (this.proceedToOrder) {
      this.router.navigate(['/order-enter-data']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

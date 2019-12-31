import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  showError = false;


  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  register() {
    this.dialogRef.close(null);
    this.router.navigate(['register']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.disable();
    this.showError = false;

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.authenticationService.login(username, password).subscribe(result => {
      this.loginForm.enable();
      this.dialogRef.close(result);
    }, error => {
      console.error(error);

      this.showError = true;
      this.loginForm.enable();
    });
  }

}

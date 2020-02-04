import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.disable();
    // this.showError = false;

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.authenticationService.login(username, password).subscribe(result => {
      this.router.navigate(['/']);
    }, error => {
      console.error(error);

      // this.showError = true;
      this.loginForm.enable();
    });
  }

}

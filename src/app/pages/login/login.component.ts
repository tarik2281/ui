import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('autoExpand', [
      transition(':enter', [
        style({ height: 0 }),
        animate('.5s ease')
      ]),
      transition(':leave', [
        animate('.5s ease', style({ height: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showGuest = false;
  proceedToOrder = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.proceedToOrder) {
        this.showGuest = true;
        this.proceedToOrder = true;
      } else {
        this.showGuest = false;
        this.proceedToOrder = false;
      }
    });

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    console.log(this.proceedToOrder);
    if (this.authenticationService.isAuthenticated()) {
      this.proceed();
    }
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
      this.proceed();
    }, error => {
      console.error(error);
      this.loginForm.enable();

      this.loginForm.setErrors({ wrong: true });
      this.loginForm.controls.username.setErrors({ wrong: true });
      this.loginForm.controls.password.setErrors({ wrong: true });

      // this.showError = true;
    });
  }

  proceed() {
    if (this.proceedToOrder) {
      this.router.navigate(['/order-enter-data']);
    } else {
      this.router.navigate(['/']);
    }
  }

}

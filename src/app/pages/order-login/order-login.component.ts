import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-login',
  templateUrl: './order-login.component.html',
  styleUrls: ['./order-login.component.scss']
})
export class OrderLoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/order-enter-data']);
    }
  }

}

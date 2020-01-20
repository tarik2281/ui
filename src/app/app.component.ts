import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginDialogComponent} from 'src/app/components/login-dialog/login-dialog.component';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {User} from 'src/app/model/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';

  user: User;

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      console.log('setting user', user);
      this.user = user;
    });

    this.authenticationService.me();
  }

  onLogout() {
    this.authenticationService.logout().subscribe(result => {
      this.snackBar.open('Erfolgreich abgemeldet!', null, {
        duration: 2000
      });
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '500px'
    });
  }
}

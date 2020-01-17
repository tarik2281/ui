import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginDialogComponent} from 'src/app/components/login-dialog/login-dialog.component';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {User} from 'src/app/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';

  user: User;
  positionY = 0;
  lastScrollY = 0;

  badgeVisible = false;

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
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
      location.reload();
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '500px'
    });
  }

  @HostListener('window:scroll', [])
  onAppScroll() {
    const offsetY = window.scrollY - this.lastScrollY;

    this.positionY = Math.min(0, Math.max(this.positionY - offsetY, -64));
    this.lastScrollY = window.scrollY;
  }

  toggleVisibility() {
    this.badgeVisible = !this.badgeVisible;
  }
}

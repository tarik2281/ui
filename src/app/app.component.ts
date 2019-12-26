import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from 'src/app/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';

  constructor(private dialog: MatDialog) {
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '500px'
    });
  }
}

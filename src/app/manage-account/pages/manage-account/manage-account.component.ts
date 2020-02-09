import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

interface RouteButton {
  readonly link: string;
  readonly label: string;
}

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  user: User;
  updateForm: FormGroup;

  routes: RouteButton[] = [
    {
      link: '.',
      label: 'Kontodaten'
    },
    {
      link: 'payments',
      label: 'Zahlungsinformationen'
    },
    {
      link: 'orders',
      label: 'Meine Bestellungen'
    },
    {
      link: 'delete-account',
      label: 'Konto löschen'
    },
    {
      link: 'change-password',
      label: 'Passwort ändern'
    }
  ];

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.authenticationService.me().subscribe(user => {
      this.user = user;

      this.updateForm = new FormGroup({
        sex: new FormControl(this.user.sex, [Validators.required]),
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        birthday: new FormControl(this.user.birthday, [Validators.required]),
        address: new FormControl(this.user.address, [Validators.required]),
        postalCode: new FormControl(this.user.postalCode, [Validators.required]),
        city: new FormControl(this.user.city, [Validators.required]),
        country: new FormControl(this.user.country, [Validators.required]),
        phoneNumber: new FormControl(this.user.phoneNumber, []),
        emailAddress: new FormControl(this.user.emailAddress, [Validators.required]),
        newsletter: new FormControl(this.user.newsletter, [])
      });
    });
  }

  updateUser() {
    if (this.updateForm.invalid) {
      return;
    }

    // this.submitError = null;
    this.updateForm.disable();
    this.userService.update(this.updateForm.value).subscribe(result => {
      console.log(result);
      this.router.navigate(['/']);
      this.snackBar.open('Änderungen erfolgreich gespeichert!', 'OK', {
        duration: 2000
      });
      this.authenticationService.me();
    }, error => {
      this.updateForm.enable();
      console.log(error);
      // this.submitError = error.error.message;
    });

  }

  logout() {
    this.authenticationService.logout().subscribe(result => {
      this.snackBar.open('Erfolgreich abgemeldet!', null, {
        duration: 2000
      });
      location.reload();
    });
  }
}

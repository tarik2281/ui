import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss']
})
export class EditUserDataComponent implements OnInit {

  user: User;
  updateForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) { }

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

}

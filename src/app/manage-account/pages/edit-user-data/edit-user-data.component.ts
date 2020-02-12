import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss']
})
export class EditUserDataComponent implements OnInit {

  user: User;
  updateForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.me().subscribe(user => {
      this.user = user;

      this.updateForm = new FormGroup({
        address: new FormControl(this.user.shippingAddress.street, [Validators.required]),
        postalCode: new FormControl(this.user.shippingAddress.postalCode, [Validators.required]),
        city: new FormControl(this.user.shippingAddress.city, [Validators.required]),
        country: new FormControl(this.user.shippingAddress.country, [Validators.required])
      });
    });
  }

}

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

  user$: Observable<User>;
  user: User;
  updateForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.user$ = this.authenticationService.me();
    this.authenticationService.me().subscribe(user => {
      this.user = user;

      this.updateForm = new FormGroup({
        address: new FormControl(this.user.address, [Validators.required]),
        postalCode: new FormControl(this.user.postalCode, [Validators.required]),
        city: new FormControl(this.user.city, [Validators.required]),
        country: new FormControl(this.user.country, [Validators.required]),
        newsletter: new FormControl(this.user.newsletter, [])
      });
    });
  }

}

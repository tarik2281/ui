import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss']
})
export class EditUserDataComponent implements OnInit {

  user: User;
  updateForm = new FormGroup({});

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.authenticationService.me().subscribe(user => {
      this.user = user;
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.userService.update(this.updateForm.value).subscribe(result => {
        console.log(result);
      });
    }
  }

}

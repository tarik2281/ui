import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/validators/match-validator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required, matchValidator('newPassword')])
    });
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.userService.changePassword(this.passwordForm.value).subscribe(() => {
        this.router.navigate(['/']);
      }, (err: HttpErrorResponse) => {
        if (err.error.message === 'wrong-password') {
          this.passwordForm.controls.currentPassword.setErrors({ wrong: true });
        }
      });
    }
  }
}

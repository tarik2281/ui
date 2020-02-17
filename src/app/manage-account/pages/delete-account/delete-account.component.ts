import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit, AfterViewInit {

  // passwordForm: FormGroup;
  passwordCtrl = new FormControl('', null);

  // @ViewChild('passwordInput', { static: false, read: MatInput }) passwordInput: MatInput;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // this.passwordForm = new FormGroup({
    //   confirmPassword: new FormControl('', [Validators.required])
    // });
    this.passwordCtrl.disable();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.passwordCtrl.enable();
      // this.passwordInput.disabled = false;
    }, 3000);
  }

  deleteAccount() {
    if (this.passwordCtrl.value) {
      this.passwordCtrl.disable();
      this.userService.deleteUser(this.passwordCtrl.value).subscribe(() => {
        this.authenticationService.logout().subscribe();
        location.reload();
      }, error => {
        this.passwordCtrl.enable();

        if (error.error.message === 'wrong-password') {
          this.passwordCtrl.setErrors({ wrong: true });
        }
      });
    }
  }
}

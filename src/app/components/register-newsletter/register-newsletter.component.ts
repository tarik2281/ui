import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SupportService } from 'src/app/services/support.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: '[app-register-newsletter]',
  templateUrl: './register-newsletter.component.html',
  styleUrls: ['./register-newsletter.component.scss']
})
export class RegisterNewsletterComponent implements OnInit {

  emailAddressCtrl = new FormControl('', [Validators.email]);

  constructor(private supportService: SupportService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  registerNewsletter() {
    if (this.emailAddressCtrl.value && this.emailAddressCtrl.valid) {
      this.emailAddressCtrl.disable();
      this.supportService.registerNewsletter(this.emailAddressCtrl.value).subscribe(() => {
        this.emailAddressCtrl.reset();
        this.emailAddressCtrl.enable();

        this.snackBar.open('Newsletter erfolgreich abonniert', 'OK', {
          duration: 2000
        });
      }, (error: HttpErrorResponse) => {
        this.emailAddressCtrl.enable();

        if (error.error.message === 'newsletter-already-registered') {
          this.emailAddressCtrl.setErrors({ alreadyRegistered: true });
        }
      });
    }
  }
}

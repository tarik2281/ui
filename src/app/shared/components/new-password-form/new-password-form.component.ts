import { Component, Host, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/validators/match-validator';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class NewPasswordFormComponent implements OnInit {

  constructor(private controlContainer: FormGroupDirective) {
  }

  ngOnInit() {
    this.controlContainer.form.addControl('newPassword', new FormControl('', [Validators.required]));
    this.controlContainer.form.addControl('confirmNewPassword', new FormControl('', [Validators.required, matchValidator('newPassword')]));
  }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit, AfterViewInit {

  passwordForm: FormGroup;

  @ViewChild('passwordInput', { static: false, read: MatInput }) passwordInput: MatInput;

  constructor() {
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.passwordInput);
      this.passwordInput.disabled = false;
    }, 3000);
  }

}

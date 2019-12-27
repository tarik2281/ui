import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log('submit');

    const formData = new FormData();
    formData.append('username', this.loginForm.controls.username.value);
    formData.append('password', this.loginForm.controls.password.value);

    // const body = `username=${this.loginForm.controls.username.value}&password=${this.loginForm.controls.password.value}`;

    this.http.post('/api/login', formData, ).subscribe(result => {
      console.log(result);
    }, error => {
      console.error(error);
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';

function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  private readonly userSubject = new BehaviorSubject<User>(null);
  readonly user = this.userSubject.asObservable();

  private meRequestObservable = null;

  public isAuthenticated(): boolean {
    return !!this.userSubject.getValue();
  }

  public login(username: string, password: string): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const observable = this.http.post<User>('/api/login', formData);
    observable.subscribe(user => {
      this.userSubject.next(user);
    });

    return observable;
  }

  public me(): Observable<User> {
    if (!this.isAuthenticated()) {

      if (!this.meRequestObservable) {
        this.meRequestObservable = this.http.get<User>('/api/user/me');
        this.meRequestObservable.subscribe(user => {
          this.userSubject.next(user);
          this.meRequestObservable = null;
        }, () => {
          this.userSubject.next(null);
          this.meRequestObservable = null;
        });
      }
    }
    return this.user;
  }

  public hasAddressData() {
    if (this.isAuthenticated()) {
      const user = this.userSubject.getValue();

      return user.address && user.postalCode && user.city && user.country;
    }

    return false;
  }

  public logout() {
    delete_cookie('JSESSIONID');
    this.userSubject.next(null);
    return this.http.get('/api/logout');
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from 'src/app/model/user';

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

  public get user(): Observable<User> {
    return this.userSubject.asObservable();
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
    const observable = this.http.get<User>('/api/user/me');
    observable.subscribe(user => {
      this.userSubject.next(user);
    });
    return observable;
  }

  public logout() {
    delete_cookie('JSESSIONID');
    this.userSubject.next(null);
    return this.http.get('/api/logout');
  }
}

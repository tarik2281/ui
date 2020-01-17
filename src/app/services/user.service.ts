import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public register(data: any) {
    return this.http.post('/api/register', data);
  }

  public update(data: any) {
    return this.http.post('/api/user/update', data);
  }

  public changePassword(data: { currentPassword: string, newPassword: string}) {
    return this.http.post('/api/user/change-password', data);
  }
}

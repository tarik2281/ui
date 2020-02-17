import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupportTicket } from 'src/app/model/support-ticket';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http: HttpClient) { }

  public addTicket(supportTicket: SupportTicket) {
    return this.http.post('/api/support/ticket', supportTicket);
  }

  public registerNewsletter(email: string) {
    return this.http.post('/api/support/registerNewsletter', email);
  }
}

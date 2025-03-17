import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  addBalance(email: string, amount: number) {
    return this.http
      .post('api/balnce/add', { email, amount })
  }

  removeBalance(email: string, amount: number) {
    return this.http
      .post('api/balnce/remove', { email, amount })
  }

  getBalance(email: string) {
    return this.http
      .get(`api/balnce/get?${email}`)
  }
}

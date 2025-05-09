import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  transaction(userId: string, amount: number, type: string, category: string, description: string, date: Date) {
    return this.http
      .post('api/balance/transaction', { userId, amount, type, category, description, date })
  }

  getBalance(email: string) {
    return this.http
      .get(`api/balance/get?${email}`)
  }
}

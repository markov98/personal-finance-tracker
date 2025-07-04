import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction, TransactionForPost } from '../types/transactions';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  transaction(transactionData: TransactionForPost) {
    return this.http
      .post<string>('api/balance/transaction', transactionData);
  }

  getTransactions(userId: string) {
    return this.http
      .get<Transaction[]>(`api/balance/get-transactions?userId=${userId}`);
  }

  getTransactionDetails(transactionId: string) {
    return this.http
      .get<Transaction>(`api/balance/transactions/${transactionId}`);
  }

  getBalance(userId: string) {
    return this.http
      .get<number>(`api/balance/get-balance?userId=${userId}`);
  }
}

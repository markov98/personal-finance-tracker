import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../types/transactions';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-transaction-details',
  standalone: false,
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  transaction = {} as Transaction;

  constructor(private financeService: FinanceService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.financeService.getTransactionDetails(data['transactionId']).subscribe({
        next: (transactionData) => {
          this.transaction = transactionData;
        }
      });
    })
  }
}

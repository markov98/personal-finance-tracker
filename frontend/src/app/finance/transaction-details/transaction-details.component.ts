import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../types/transactions';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-transaction-details',
  standalone: false,
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  transaction: Transaction | undefined;
  transId: string = "placeholder";

  constructor(private financeService: FinanceService) {}

    ngOnInit(): void {
    this.financeService.getTransactionDetails(this.transId).subscribe({
      next: (data) => {
        this.transaction = data;
      }
    });
  }
}

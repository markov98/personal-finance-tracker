import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { Transaction } from '../../types/transactions';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-transaction-list',
  standalone: false,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private financeService: FinanceService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.financeService.getTransactions(this.userService.userId).subscribe({
      next: (data) => {
        this.transactions = data;
      }
    });
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';



@NgModule({
  declarations: [
    TransactionComponent,
    TransactionListComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FinanceModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

export const routes: Routes = [
    { path: 'add-transaction', component: AddTransactionComponent },
    { path: 'transaction-list', component: TransactionListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class FinanceRoutingModule { }
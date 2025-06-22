import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AuthGuard } from '../guards/auth-guard.guard';

export const routes: Routes = [
    { path: 'add-transaction', component: AddTransactionComponent, canActivate: [AuthGuard] },
    { path: 'transaction-list', component: TransactionListComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class FinanceRoutingModule { }
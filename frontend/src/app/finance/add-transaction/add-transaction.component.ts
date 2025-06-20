import { Component } from '@angular/core';
import { FinanceService } from '../finance.service';
import { UserService } from '../../user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  standalone: false,
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {
  form;

  constructor(
    private financeService: FinanceService,
    private userService: UserService,
    private fb: FormBuilder,
    private Router: Router
  ) {
        this.form = this.fb.group({
          amount: ['', [Validators.required]],
          type: ['', [Validators.required]],
          category: ['', [Validators.required]],
          description: [''],
          date: ['', [Validators.required]]
        });
   };
}

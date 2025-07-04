import { Component } from '@angular/core';
import { FinanceService } from '../finance.service';
import { UserService } from '../../user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  standalone: false,
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {
  form: FormGroup;


  constructor(
    private financeService: FinanceService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: [''],
      date: ['', [Validators.required]]
    });
  };

  addTransaction(): void {
    if (this.form.invalid) {
      return;
    }

    const userId = this.userService.userId
    const { amount, type, category, description, date } = this.form.value

    this.financeService.transaction({ userId, amount, type, category, description, date })
      .subscribe({
        next: () => {
          this.router.navigate(['/transaction-list'])
        },
      })
  }
}

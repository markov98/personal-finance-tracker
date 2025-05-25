import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from '../../utils/password-match-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../core/error/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  form;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required]],
          rePassword: ['', [Validators.required]],
        },
        {
          validators: [matchPasswordsValidator('password', 'rePassword')],
        }
      ),
    });
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  signup(): void {
    console.log('test1');

    if (this.form.invalid) {
      return;
    }

    console.log('test2');

    const { username, email, passGroup: { password, rePassword } = {} } = this.form.value;

    this.userService
      .signup(username!, email!, password!, rePassword!)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      error: (err) => {
        // If backend sends structured errors like { error: 'message here' }
        this.errorMsg = err?.error?.error || 'Registration failed. Please try again.';
      }
    });
  }
}

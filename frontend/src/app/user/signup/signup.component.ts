import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email-validator';
import { matchPasswordsValidator } from '../../utils/password-match-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(['abv', 'gmail', 'yahoo'])]],
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

  get passGroup() {
    return this.form.get('passGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  signup(): void {
    if (this.form.invalid) {
      return;
    }

    const { username, email, passGroup: { password, rePassword } = {} } = this.form.value;

    this.userService
      .signup(username!, email!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}

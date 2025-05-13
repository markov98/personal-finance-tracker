import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
  standalone: false
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (!this.userService.userId) {
      this.isAuthenticating = false; // If no userId, proceed without making an API call
      return;
    }

    this.userService.getUser(this.userService.userId).subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      }
    });
  }
}
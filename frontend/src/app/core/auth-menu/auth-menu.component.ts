import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-menu',
  standalone: false,
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.css'
})
export class AuthMenuComponent {
  constructor(private userService: UserService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get firstName(): string {
    return this.userService.user?.username || '';
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}

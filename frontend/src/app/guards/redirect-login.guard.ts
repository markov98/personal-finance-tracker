import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirect implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(): boolean {
    if (this.userService.userId) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
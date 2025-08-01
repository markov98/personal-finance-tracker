import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  // BehaviorSubject to track the authenticated user state
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  // Stores the current user
  user: UserForAuth | undefined;

  // Subscription to track user state updates
  userSubscription: Subscription;

  // Checks if a user is logged in
  get isLogged(): boolean {
    return !!this.user;
  }

  get accessToken(): string | undefined {
    const cookieUser = this.cookieService.get('user');
    return this.user ? this.user.accessToken : cookieUser ? JSON.parse(cookieUser).accessToken : '';
  }

  get userId(): string {
    const cookieUser = this.cookieService.get('user');
    return this.user ? this.user._id : cookieUser ? JSON.parse(cookieUser)._id : '';
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // Subscribe to user state changes and synchronize with cookies  
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;

      if (user) {
        this.cookieService.set('user', JSON.stringify(user), {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
      }
    });


  }

  // Methods for login, signup, and logout
  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('api/users/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  signup(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('api/users/register', {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('api/users/logout', {})
      .pipe(tap(() => {
        this.cookieService.delete('user', '/')
        this.user$$.next(undefined)
      }));
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ) {
    return this.http.put<UserForAuth>('api/users/change-password', { currentPassword, newPassword })
  }

  getUser(id: string) {
    return this.http
      .get<UserForAuth>(`api/users/get/${id}`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // Unsubscribes from user updates to prevent memory leaks
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
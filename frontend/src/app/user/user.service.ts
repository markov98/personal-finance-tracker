import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  // BehaviorSubject to track the authenticated user state
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  // Stores the current user
  user: UserForAuth | undefined;
  USER_KEY = '[user]'; // Key for storing user data (if needed)

  // Subscription to track user state updates
  userSubscription: Subscription;

  // Checks if a user is logged in
  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    // Subscribe to user state changes
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
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

  logout(accessToken: string) {
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    return this.http
      .post('api/users/logout', {}, { headers })
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getUser(id: string) {
    return this.http
      .get(`api/users/get/${id}`);
  }

  // Unsubscribes from user updates to prevent memory leaks
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
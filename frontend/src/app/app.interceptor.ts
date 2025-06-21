import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environment/env';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

const { apiUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
    API = 'api'; // Prefix used to identify API requests

    constructor(
        private errorService: ErrorService,
        private router: Router,
        private userService: UserService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // If request URL starts with API, replace it with the full backend URL
        if (req.url.startsWith(this.API)) {
            req = req.clone({
                url: req.url.replace(this.API, apiUrl),
                withCredentials: true, // Include credentials (cookies, auth headers)
            });
        }

        // Setting Authentication header is user is logged

        if (this.userService.isLogged || this.userService.userId) {

            req = req.clone({
                setHeaders: {
                    'X-Authorization': `${this.userService.accessToken}`
                }
            });
        }

        return next.handle(req).pipe(

            catchError((err) => {
                if (err.status === 401) {
                    // Authrorization error - redirect to login page
                    this.router.navigate(['/login']);
                } else if (err.status > 500) {
                    // Internal server error — redirect to error page
                    this.errorService.setError(err);
                    this.router.navigate(['/error']);
                }

                // Do NOT redirect for 400/422/etc (form or validation errors)
                return throwError(() => err);
            })
        );
    }
}

// Provides the interceptor globally
export const httpInterceptorProviders: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
];

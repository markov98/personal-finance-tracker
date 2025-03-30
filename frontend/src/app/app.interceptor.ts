import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environment/env';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
    API = 'api'; // Prefix used to identify API requests

    constructor(private errorService: ErrorService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // If request URL starts with API, replace it with the full backend URL
        if (req.url.startsWith(this.API)) {
            req = req.clone({
                url: req.url.replace(this.API, apiUrl),
                withCredentials: true, // Include credentials (cookies, auth headers)
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    // Redirect to login if unauthorized
                    this.router.navigate(['/login']);
                } else {
                    // Handle other errors and redirect to an error page
                    this.errorService.setError(err);
                    this.router.navigate(['/error']);
                }

                return [err]; // Return the error so it can be handled further
            })
        );
    }
}

// Provides the interceptor globally
export const httpInterceptorProviders: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
];

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authService.getToken()) {
      const cloned = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this._authService.getToken()
        ),
      });

      return next.handle(cloned).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this._authService
              .refreshToken({
                email: this._authService.getUserDetail()?.email,
                token: this._authService.getToken() || '',
                refreshToken: this._authService.getRefreshToken() || '',
              })
              .subscribe({
                next: (response) => {
                  if (response.isSuccess) {
                    localStorage.setItem('user', JSON.stringify(response));
                    const cloned = request.clone({
                      setHeaders: {
                        Authorization: `Bearer ${response.token}`,
                      },
                    });
                    location.reload();
                  }
                },
                error: () => {
                  this._authService.logout();
                  this._router.navigate(['/login']);
                },
              });
          }
          return throwError(err);
        })
      );
    }
    return next.handle(request);
  }
}

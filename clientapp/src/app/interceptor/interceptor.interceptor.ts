import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authService.getToken()) {
      const cloned = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this._authService.getToken()
        ),
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}

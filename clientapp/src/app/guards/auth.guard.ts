import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from '../pages/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor
    (
      private _authService: AuthService,
      private _snackbar: MatSnackBar,
      private _router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    this._snackbar.open("You are not logged in! Please login and try again", 'Ok', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 2500);
    return false;
  }

}

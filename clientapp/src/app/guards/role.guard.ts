import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor
    (
      private _authService: AuthService,
      private _snackbar: MatSnackBar,
      private _router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data['roles'] as string[];
    console.log("roles", roles);

      if (!this._authService.isLoggedIn()) {
        this._router.navigate(['/login']);
        this._snackbar.open('You must log in to view this page', 'OK', {
          duration: 3000,
        });
        return false;
      }
      const userRoles = this._authService.getRolesAccess();
      console.log(userRoles);
      console.log(roles);
    
      if (roles.some((role) => userRoles?.includes(role))) return true;
      this._router.navigate(['/']);
      this._snackbar.open('You do not have permission to view this page', 'OK', {
        duration: 3000,
      });
      return false;
  }
  
}

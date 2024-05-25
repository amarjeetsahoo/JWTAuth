import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private tokenKey = 'token';
  username: string = '';
  role: string = '';
  userDetail: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this._authService.isLoggedIn()) {
      const cookie = localStorage.getItem(this.tokenKey) || '';
      const decode = jwtDecode(cookie);
      const a = JSON.stringify(decode);
      const ab = JSON.parse(a);
      this.userDetail = this._authService.getUserDetail();
      return true;
    }
    else {
      this.username = '';
      this.role = '';
      return false;
    }
  }

  logout() {
    this._authService.logout();
    this._snackbar.open('Logout Successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'center'
    });

    this._router.navigate(["/login"]);
  }

}

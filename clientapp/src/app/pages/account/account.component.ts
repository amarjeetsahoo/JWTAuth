import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/interfaces/user-details.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userDetails!: UserDetail;

  constructor(
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getBasicDetails();
    }, 1000);
  }

  getBasicDetails() {
    this._authService.getAccountDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        console.log(this.userDetails);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}

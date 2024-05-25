import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/interfaces/user-details.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUserData: UserDetail[] = [];

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router) {
  }

  ngOnInit(): void {
    this._authService.getAllUserDetails().subscribe({
      next: (response) => {
        this.allUserData = response;
        console.log(this.allUserData);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}

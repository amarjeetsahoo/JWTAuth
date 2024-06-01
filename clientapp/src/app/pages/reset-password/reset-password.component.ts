import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordDTO } from 'src/app/interfaces/reset-password.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword!: FormGroup
  resetPasswordData!: ResetPasswordDTO;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      newPassword: ['', [Validators.required]]
    });
  }

  reset() {
    let email = '', token = '';
    this._route.queryParams.subscribe(params => {
      email = params["email"];
      token = params["token"];
    });
    this.resetPasswordData = {
      email: email,
      token: token,
      newPassword: this.resetPassword.value.newPassword
    }
    console.log(this.resetPasswordData);
    this._authService.resetPassword(this.resetPasswordData).subscribe({
      next: (response) => {
        this._snackbar.open(response.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center'
        });
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 3500)
      },
      error: (error) => {
        this._snackbar.open(error.error.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center'
        });
      }
    });
  }

}

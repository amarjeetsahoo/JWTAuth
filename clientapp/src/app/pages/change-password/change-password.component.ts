import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDTO } from 'src/app/interfaces/change-password.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassword!: FormGroup;
  changePasswordDto!: ChangePasswordDTO;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.changePassword = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    })
  }

  change() {
    this.changePasswordDto = {
      email: this._authService.getUserDetail()?.email,
      currentPassword: this.changePassword.value.currentPassword,
      newPassword: this.changePassword.value.newPassword
    }

    this._authService.changePassword(this.changePasswordDto).subscribe({
      next: (response) => {
        this._snackbar.open(response.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center'
        });

        setTimeout(() => {
          this._router.navigate(['/']);
        }, 3200)
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

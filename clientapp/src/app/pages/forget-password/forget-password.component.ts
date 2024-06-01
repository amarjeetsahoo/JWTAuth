import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPassword!: FormGroup;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendLink() {
    this._authService.forgotPassword(this.forgotPassword.value).subscribe({
      next: (response) => {
        this._snackbar.open(response.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center'
        });
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

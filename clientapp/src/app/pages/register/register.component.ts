import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.getRoles();
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  register() {
    console.log(this.registerForm);
    this._authService.register(this.registerForm.value).subscribe({
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
    })
  }

  getRoles() {
    this.roles = [];
    this._authService.getRoles().subscribe({
      next: (response) => {
        console.log(response);
        response.forEach(element => {
          this.roles.push(element.name);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}

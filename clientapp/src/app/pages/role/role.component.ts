import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleCreateRequest } from 'src/app/interfaces/roleCreateRequest.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roleService = inject(RoleService);
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAllUserDetails();
  selectedUser: string = '';
  selectedRole: string = '';

  snackBar = inject(MatSnackBar);

  constructor() { }

  ngOnInit(): void {
  }


  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        if (response) {
          this.snackBar.open('Role Created Successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/roles']);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.errorMessage = error.error;
          this.snackBar.open(error.error, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      },
    });
  }

  deleteRole(id: string) {
    this.roleService.delete(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open('Role Deleted Successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/roles']);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
    });
  }

  assignRole() {
    this.roleService
      .assignRole(this.selectedUser, this.selectedRole)
      .subscribe({
        next: (response) => {
          this.roles$ = this.roleService.getRoles();
          this.snackBar.open('Role Assign Successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/roles']);
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, 'Close', {
            duration: 3000,
          });
        },
      });
  }

}

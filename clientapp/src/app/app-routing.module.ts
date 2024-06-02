import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { RoleGuard } from './guards/role.guard';
import { RoleComponent } from './pages/role/role.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [AuthGuard] },
  { path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'App Developer'] } },
  { path: 'roles', component: RoleComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

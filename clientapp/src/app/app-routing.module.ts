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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: { roles: ['Admin','App Developer'] } },
  { path: 'roles', component: RoleComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

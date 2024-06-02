import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterInterface } from '../interfaces/register.interface';
import { RolesInterface } from '../interfaces/roles.interface';
import { UserDetail } from '../interfaces/user-details.interface';
import { ForgotPasswordDTO } from '../interfaces/forgot-password.interface';
import { ResetPasswordDTO } from '../interfaces/reset-password.interface';
import { ChangePasswordDTO } from '../interfaces/change-password.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/login`, data)
      .pipe(
        map((response: AuthResponse) => {
          if (response.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
  }

  register(data: RegisterInterface): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/register`, data)
      .pipe(
        map((response: AuthResponse) => {
          return response;
        })
      );
  }

  forgotPassword(data: ForgotPasswordDTO): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/forgot-password`, data)
      .pipe(
        map((response: AuthResponse) => {
          return response;
        })
      );
  }

  changePassword(data: ChangePasswordDTO): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/change-password`, data)
      .pipe(
        map((response: AuthResponse) => {
          return response;
        })
      );
  }

  resetPassword(data: ResetPasswordDTO): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/reset-password`, data)
      .pipe(
        map((response: AuthResponse) => {
          return response;
        })
      );
  }

  getRoles(): Observable<RolesInterface[]> {
    return this.http
      .get<RolesInterface[]>(`${this.apiUrl}Roles/getRoles`)
      .pipe(
        map((res: RolesInterface[]) => {
          return res
        })
      );
  }

  getAccountDetails(): Observable<UserDetail> {
    return this.http
      .get<UserDetail>(`${this.apiUrl}Account/detail`)
      .pipe(
        map((res: UserDetail) => {
          return res;
        })
      );
  }

  getAllUserDetails(): Observable<UserDetail[]> {
    return this.http
      .get<UserDetail[]>(`${this.apiUrl}Account/getusers`)
      .pipe(
        map((res: UserDetail[]) => {
          return res;
        })
      );
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    return userDetail;
  }

  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;
    // return !this.isTokenExpired();
    return true;
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    // if (isTokenExpired) this.logout();
    // return isTokenExpired;
    return true;
  }

  getRolesAccess = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  };

  logout() {
    localStorage.removeItem(this.userKey);
  }

  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/refresh-token`, data);

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  };
}

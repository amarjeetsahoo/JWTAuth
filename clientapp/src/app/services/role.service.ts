import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleCreateRequest } from '../interfaces/roleCreateRequest.interface';
import { Role } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(
    private http: HttpClient
  ) { }

  getRoles = (): Observable<Role[]> =>
    this.http.get<Role[]>(`${this.apiUrl}Roles/getRoles`);

  createRole = (role: RoleCreateRequest): Observable<{ message: string }> =>
    this.http.post<{ message: string }>(`${this.apiUrl}Roles`, role);

  delete = (id: string): Observable<{ message: string }> =>
    this.http.delete<{ message: string }>(`${this.apiUrl}Roles?id=${id}`);

  assignRole = (
    userId: string,
    roleId: string
  ): Observable<{ message: string }> =>
    this.http.post<{ message: string }>(`${this.apiUrl}Roles/assign`, {
      userId,
      roleId,
    });

}

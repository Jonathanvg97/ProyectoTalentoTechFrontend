import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserModel } from '../../core/models/user.model';
import { LoginInterface } from '../../core/interface/login.interface';

const base_url = environment.base_url;
const base_url_auth = environment.base_url_auth;
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private router = inject(Router);

  user: UserModel;

  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        authorization: this.token,
      },
    };
  }

  loginUser(login: LoginInterface): Observable<any> {
    return this.httpClient
      .post(`${base_url}/${base_url_auth}/login`, login)
      .pipe(
        tap((resp: any) => {
          const { _id, name, email, role, createdAt, clientType } = resp.user;
          this.user = new UserModel(
            _id,
            name,
            email,
            '',
            role,
            new Date(createdAt),
            clientType
          );
          this.saveUserToLocalStorage(this.user, resp.token);
          this.router.navigateByUrl('/homeOpportunity');
        })
      );
  }

  logout(id: string): Observable<any> {
    return this.httpClient
      .post(`${base_url}/${base_url_auth}/signOut/${id}`, {}, this.headers)
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/home');
        }),
        catchError((error) => {
          console.error('Error logging out:', error);
          return of(false);
        })
      );
  }

  private saveUserToLocalStorage(user: UserModel, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user.role));
  }
}

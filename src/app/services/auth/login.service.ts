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

  validateToken(): Observable<boolean> {
    return this.httpClient
      .get(`${base_url}/${base_url_auth}/login`, {
        headers: {
          authorization: this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { name, email, role, _id, createdAt, clientType } = resp.user;
          this.user = new UserModel(
            _id,
            name,
            email,
            role,
            createdAt,
            clientType
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  loginUser(login: LoginInterface): Observable<any> {
    return this.httpClient
      .post(`${base_url}/${base_url_auth}/login`, login)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          const { name, email, role, _id, createdAt, clientType } = resp.user;
          this.user = new UserModel(
            _id,
            name,
            email,
            role,
            createdAt,
            clientType
          );
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
}

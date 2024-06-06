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
          localStorage.setItem('token', resp.token);
          this.user = resp.user; // asignar el usuario
          localStorage.setItem('user', JSON.stringify(this.user)); // Guarda el usuario en localStorage
          // console.log('Usuario logueado:', this.user);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

  getUserRole(): Observable<string> {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return of(parsedUser.role);
    }
    return of(''); // Devolver un string vacío si no hay usuario
  }

  loadUserFromLocalStorage(): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        // console.log('Usuario cargado desde localStorage:', this.user);
      }
      resolve(this.user);
    });
  }

  logout(id: string): Observable<any> {
    return this.httpClient
      .post(`${base_url}/${base_url_auth}/signOut/${id}`, {}, this.headers)
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigateByUrl('/home');
        }),
        catchError((error) => {
          console.error('Error logging out:', error);
          return of(false);
        })
      );
  }
}

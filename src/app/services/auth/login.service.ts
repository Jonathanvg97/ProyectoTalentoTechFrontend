import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, of, catchError, tap } from 'rxjs';
import { UserModel } from '../../core/models/user.model';
import { LoginInterface } from '../../core/interface/login.interface';
import { JwtDecodedService } from '../jwt/jwt-decoded.service';

const base_url = environment.base_url;
const base_url_auth = environment.base_url_auth;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private router: Router;
  private jwtDecodedService: JwtDecodedService;
  user: UserModel;

  constructor(private httpClient: HttpClient, router: Router) {
    this.router = router;
    this.jwtDecodedService = new JwtDecodedService();
  }

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

  loginUser(login: any): Observable<any> {
    return this.httpClient
      .post(`${base_url}/${base_url_auth}/login`, login)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          const decodedToken = this.jwtDecodedService.decodeToken(resp.token);
          // console.log('User ID:', decodedToken._id);
          // console.log('User Role:', decodedToken.role);
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          return of(null);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = this.getTokenExpirationDate(token);
      if (expirationDate && expirationDate > new Date()) {
        return of(true);
      } else {
        this.getUserIdFromToken().subscribe((userId) => {
          if (userId) {
            this.logout(userId).subscribe();
          }
        });
        return of(false);
      }
    }
    return of(false);
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload && tokenPayload.exp) {
        return new Date(tokenPayload.exp * 1000);
      }
    } catch (error) {
      console.error('Error parsing token payload', error);
    }
    return null;
  }

  getUserIdFromToken(): Observable<string | null> {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtDecodedService.decodeToken(token);
      return of(decodedToken?._id || null);
    }
    return of(null);
  }

  getUserRoleFromToken(): Observable<string | null> {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtDecodedService.decodeToken(token);
      return of(decodedToken?.role || null);
    }
    return of(null);
  }

  getUserNameFromToken(): Observable<string | null> {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtDecodedService.decodeToken(token);
      return of(decodedToken?.name || null);
    }
    return of(null);
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

  forgetPassword(email: string): Observable<any> {
    return this.httpClient
      .post(`${base_url}/${base_url_auth}/forgetPassword`, email, {})
      .pipe(
        catchError((error) => {
          console.error('Error logging out:', error);
          return of(false);
        })
      );
  }

  resetPassword(token: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('x-token-pass', token);
    return this.httpClient
      .put(
        `${base_url}/${base_url_auth}/resetPassword`,
        { password },
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error during reset password:', error);
          return of(null);
        })
      );
  }
}

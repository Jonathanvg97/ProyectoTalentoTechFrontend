import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tokenExpirationDate = getTokenExpirationDate(token);
    if (tokenExpirationDate && tokenExpirationDate <= new Date()) {
      localStorage.removeItem('token'); // Remove expired token
      router.navigate(['/login']);
      return throwError(() => new Error('Token expired'));
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token'); // Remove invalid token
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

const getTokenExpirationDate = (token: string): Date | null => {
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload && tokenPayload.exp) {
      return new Date(tokenPayload.exp * 1000);
    }
  } catch (error) {
    console.error('Error parsing token payload', error);
  }
  return null;
};

// src/app/services/jwt/jwt-decoded.service.ts
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecodedService {
  constructor() {}

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = this.decodeToken(token);
    if (!decoded || !decoded.exp) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string, offsetSeconds: number = 0): boolean {
    const date = this.getTokenExpirationDate(token);
    if (!date) return false;
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}

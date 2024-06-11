import { userCreateInterface } from './../../core/interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
const base_url_users = environment.base_url_users;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
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

  createUser(user: userCreateInterface) {
    return this.httpClient.post(
      `${base_url}/${base_url_users}/userCreate`,
      user
    );
  }

  getDetailByUserId(userId: string): Observable<any> {
    return this.httpClient.get(
      `${base_url}/${base_url_users}/${userId}/`,
      this.headers
    );
  }

  updateUserById(userId: string, user: userCreateInterface) : Observable<any>{
    return this.httpClient.put(
      `${base_url}/${base_url_users}/${userId}/`,
      user,
      this.headers
    );
  }
}

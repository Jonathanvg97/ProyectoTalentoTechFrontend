import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../core/models/user.model';
import { userCreateInterface } from '../../core/interface/usuario.interface';
import { environment } from '../../../environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: userCreateInterface) {
    return this.httpClient.post(`${base_url}/api/users/userCreate`, user);
  }
}

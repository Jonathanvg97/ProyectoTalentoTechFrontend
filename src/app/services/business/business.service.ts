import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { businessInterface } from '../../core/interface/business.interface';

const base_url = environment.base_url;
const base_url_business = environment.base_url_business;
@Injectable({
  providedIn: 'root',
})
export class BusinessService {
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

  createBusiness(business: businessInterface) {
    return this.httpClient.post(
      `${base_url}/${base_url_business}/create`,
      business,
      this.headers
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
const base_url_match = environment.base_url_matches;

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
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

  createMatch(userId: string, businessId: string) {
    return this.httpClient.post(
      `${base_url}/${base_url_match}/createMatch`,
      { userId, businessId },
      this.headers
    );
  }

  getMatchById(matchId: string): Observable<any> {
    return this.httpClient.get(`${base_url}/${base_url_match}/${matchId}`, this.headers);
  }
  
}

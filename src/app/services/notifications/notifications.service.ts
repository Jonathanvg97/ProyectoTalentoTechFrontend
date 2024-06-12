import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
const base_url_notifications = environment.base_url_notifications;
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
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

  //obtener todas las notificaciones de un usuario por su ID
  getNotificationsByUserId(userId: string): Observable<any> {
    return this.httpClient.get(
      `${base_url}/${base_url_notifications}/list/${userId}`,
      this.headers
    );
  }

  acceptedMatchedById(notificationId: string, userRole: string): Observable<any> {
    return this.httpClient.put(
      `${base_url}/${base_url_notifications}/notifications/${userRole}/${notificationId}/accepted`,
      {},
      this.headers
    );
  }

  canceledMatchedById(notificationId: string, userRole: string): Observable<any> {
    return this.httpClient.put(
      `${base_url}/${base_url_notifications}/notifications/${userRole}/${notificationId}/cancel`,
      {},
      this.headers
    );
  }
}

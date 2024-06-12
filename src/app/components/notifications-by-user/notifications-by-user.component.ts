import { NotificationsService } from './../../services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-notifications-by-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-by-user.component.html',
  styleUrl: './notifications-by-user.component.css',
})
export class NotificationsByUserComponent implements OnInit {
  @Input() closeOffcanvas!: () => void;
  userId: string | null = null;
  notificationDetail: any[] = [];
  userRole: string | null = null;
  constructor(
    private loginService: LoginService,
    private notificationsService: NotificationsService
  ) {}

  // Método para manejar el cierre del offcanvas
  handleClose() {
    if (this.closeOffcanvas) {
      this.closeOffcanvas();
    } else {
      console.error('closeOffcanvas function is not defined');
    }
  }

  ngOnInit(): void {
    this.loadNotifications(); 
    this.loginService.getUserRoleFromToken().subscribe((role) => {
      this.userRole = role;
    })
  }

  // Función para cargar las notificaciones del usuario
  loadNotifications() {
    this.loginService.getUserIdFromToken().subscribe((userId) => {
      this.userId = userId;
      if (this.userId) {
        this.notificationsService.getNotificationsByUserId(this.userId).subscribe((response) => {
          this.notificationDetail = response.notifications; 
          console.log(this.notificationDetail);
        });
      }
    });
  }
}

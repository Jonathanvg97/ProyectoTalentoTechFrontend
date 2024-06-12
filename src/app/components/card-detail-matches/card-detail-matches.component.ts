import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { MatchesService } from '../../services/matches/matches.service';
import { LoginService } from '../../services/auth/login.service';
import { Observable, forkJoin } from 'rxjs';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { IndustryTypesPipe } from '../../pipes/industry-types.pipe';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../services/notifications/notifications.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-card-detail-matches',
  standalone: true,
  imports: [
    SideNavComponent,
    UserRoleDirective,
    IndustryTypesPipe,
    CommonModule,
  ],
  templateUrl: './card-detail-matches.component.html',
  styleUrl: './card-detail-matches.component.css',
})
export class CardDetailMatchesComponent implements OnInit {
  userId: string | null = null;
  userRole: string | null = null;
  matchesByUserId: any[] = [];

  constructor(
    private userService: UsersService,
    private matchesService: MatchesService,
    private notificationsService: NotificationsService,
    private loginService: LoginService,
    private router: Router
  ) {}

  acceptedMatchedById(notificationId: string): void {
    this.loginService.getUserRoleFromToken().subscribe((role) => {
      this.userRole = role;
      if (this.userRole) {
        this.notificationsService
          .acceptedMatchedById(notificationId, this.userRole)
          .subscribe((res) => {
            Swal.fire('¡Match aceptado!', '', 'success');
            this.router.navigate(['/matchesByUser']);
          });
      }
    });
  }

  canceledMatchedById(notificationId: string): void {
    this.loginService.getUserRoleFromToken().subscribe((role) => {
      this.userRole = role;
      if (this.userRole) {
        this.notificationsService
          .canceledMatchedById(notificationId, this.userRole)
          .subscribe((res) => {
            Swal.fire('¡Match cancelado!', '', 'success');
            this.router.navigate(['/matchesByUser']);
          });
      }
    });
  }

  ngOnInit(): void {
    // Obtener el userId del token
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      // Si se obtiene el userId, llamar al servicio para obtener los detalles del usuario
      if (this.userId) {
        this.userService
          .getDetailByUserId(this.userId)
          .subscribe((userDetail: any) => {
            // Verificar si el usuario tiene matches
            if (userDetail.user.matches && userDetail.user.matches.length > 0) {
              // Obtener los detalles de cada match y asignarlos a matchesByUserId
              const matchObservables: Observable<any>[] =
                userDetail.user.matches.map((matchId: string) =>
                  this.matchesService.getMatchById(matchId)
                );
              // Esperar a que se completen todas las solicitudes de matches
              forkJoin(matchObservables).subscribe((matches: any[]) => {
                this.matchesByUserId = matches;
                // console.log(matches);
              });
            }
          });
      }
    });
  }
}

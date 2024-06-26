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
import { Router } from '@angular/router';

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
            this.fetchMatches(); // Volver a obtener los matches
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
            this.fetchMatches(); // Volver a obtener los matches
          });
      }
    });
  }

  fetchMatches(): void {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.userService.getDetailByUserId(this.userId).subscribe((userDetail: any) => {
          if (userDetail.user.matches && userDetail.user.matches.length > 0) {
            const matchObservables: Observable<any>[] =
              userDetail.user.matches.map((matchId: string) =>
                this.matchesService.getMatchById(matchId)
              );
            forkJoin(matchObservables).subscribe((matches: any[]) => {
              this.matchesByUserId = matches;
            });
          } else {
            this.matchesByUserId = [];
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.loginService.getUserRoleFromToken().subscribe((role) => {
      this.userRole = role;
    });
    this.fetchMatches(); 
  }
}

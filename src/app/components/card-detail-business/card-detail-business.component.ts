import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ActivatedRoute,  Router } from '@angular/router';
import { businessInterface } from '../../core/interface/business.interface';
import { BusinessDetailsService } from '../../services/business/busines-details.service';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { IndustryTypesPipe } from '../../pipes/industry-types.pipe';
import { MatchesService } from '../../services/matches/matches.service';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-detail-business',
  standalone: true,
  imports: [SideNavComponent, UserRoleDirective, IndustryTypesPipe],
  templateUrl: './card-detail-business.component.html',
  styleUrls: ['./card-detail-business.component.css'],
})
export class CardDetailBusinessComponent implements OnInit {
  businessDetails: businessInterface | null = null;
  userId: string | null = null; // Almacenar el ID del usuario

  constructor(
    private businessDetailsService: BusinessDetailsService,
    private matchService: MatchesService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.businessDetailsService.getBusinessDetails().subscribe((details) => {
      this.businessDetails = details;
    });

    // Obtener el ID del usuario
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
    });
  }

  createMatch(businessId: string | undefined) {
    if (this.userId && businessId) {
      this.matchService.createMatch(this.userId, businessId).subscribe({
        next: () => {
          Swal.fire('¡Match creado exitosamente!', '', 'success');
          this.router.navigate(['/matchesByUser']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      console.error('UserId or BusinessId is undefined');
    }
  }
}

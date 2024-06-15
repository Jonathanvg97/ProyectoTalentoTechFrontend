import { LoginService } from './../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { CardOptionsComponent } from '../../components/card-options/card-options.component';
import { CarouselModule } from 'primeng/carousel';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { FormCreateBussinessComponent } from '../../components/form-create-bussiness/form-create-bussiness.component';
import { CardBusinessComponent } from '../../components/card-business/card-business.component';
import { CardDetailMatchesComponent } from '../../components/card-detail-matches/card-detail-matches.component';
import { CardDetailUserComponent } from '../../components/card-detail-user/card-detail-user.component';

interface CardOption {
  title: string;
  icon: string;
  buttonText: string;
  routeButton?: string;
}

@Component({
  selector: 'app-home-opportunity',
  standalone: true,
  imports: [
    HeaderComponent,
    SideNavComponent,
    CardOptionsComponent,
    FormCreateBussinessComponent,
    CardBusinessComponent,
    CardDetailMatchesComponent,
    CardDetailUserComponent,
    CarouselModule,
    UserRoleDirective,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './home-opportunity.component.html',
  styleUrls: ['./home-opportunity.component.css'],
})
export class HomeOpportunityComponent implements OnInit {
  userId: string | null = null;
  userRole: string | null = null;
  cardOptions: CardOption[] = [];

  constructor(private loginService: LoginService) {}

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      this.updateCardOptions();
    });

    this.loginService.getUserRoleFromToken().subscribe((role) => {
      this.userRole = role;
      this.updateCardOptions();
    });
  }

  updateCardOptions(): void {
    this.cardOptions = [
      {
        title: 'Crear Oferta',
        icon: 'fa-solid fa-business-time',
        buttonText: 'Crear',
        routeButton: '/createBusiness',
      },
      {
        title: this.userRole === 'admin' ? 'Ver publicaciones' : 'Ver Ofertas',
        icon: 'fa-solid fa-eye',
        buttonText: 'Ver',
        routeButton: '/allBusiness',
      },
      {
        title: 'Ver usuarios',
        icon: 'fa-solid fa-users',
        buttonText: 'Ver',
        routeButton: '/allUsers',
      },
      {
        title: 'Ver Matches',
        icon: 'fa-solid fa-handshake',
        buttonText: 'Ver',
        routeButton: '/matchesByUser',
      },
      {
        title: 'Ver Perfil',
        icon: 'fa-solid fa-cog',
        buttonText: 'Ver',
        routeButton: '/userById/' + this.userId,
      },
    ];
  }
}

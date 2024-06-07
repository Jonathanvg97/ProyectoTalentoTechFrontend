import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { CardOptionsComponent } from '../../components/card-options/card-options.component';
import { CarouselModule } from 'primeng/carousel';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { FormCreateBussinessComponent } from '../../components/form-create-bussiness/form-create-bussiness.component';
import { CardBusinessComponent } from '../../components/card-business/card-business.component';

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
    CarouselModule,
    UserRoleDirective,
    RouterModule,
    RouterLink
  ],
  templateUrl: './home-opportunity.component.html',
  styleUrls: ['./home-opportunity.component.css'],
})
export class HomeOpportunityComponent implements OnInit {
  cardOptions: CardOption[] = [
    {
      title: 'Crear Oferta',
      icon: 'fa-solid fa-business-time',
      buttonText: 'Crear',
      routeButton: '/createBusiness',
    },
    {
      title: 'Ver Ofertas',
      icon: 'fa-solid fa-eye',
      buttonText: 'Ver',
      routeButton: '/allBusiness',
    },
    {
      title: 'Ver usuarios',
      icon: 'fa-solid fa-users',
      buttonText: 'Ver',
      routeButton: '/',
    },
    {
      title: 'Ver Matches',
      icon: 'fa-solid fa-handshake',
      buttonText: 'Ver',
      routeButton: '/',
    },
    {
      title: 'Ver Perfil',
      icon: 'fa-solid fa-cog',
      buttonText: 'Ver',
      routeButton: '/',
    },
  ];

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

  ngOnInit(): void {}
}

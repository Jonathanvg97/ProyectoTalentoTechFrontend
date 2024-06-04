import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { CardOptionsComponent } from '../../components/card-options/card-options.component';
import { CarouselModule } from 'primeng/carousel';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';

interface CardOption {
  title: string;
  icon: string;
  buttonText: string;
}

@Component({
  selector: 'app-home-opportunity',
  standalone: true,
  imports: [
    HeaderComponent,
    SideNavComponent,
    CardOptionsComponent,
    CarouselModule,
    UserRoleDirective,
  ],
  templateUrl: './home-opportunity.component.html',
  styleUrls: ['./home-opportunity.component.css'],
})
export class HomeOpportunityComponent {
  cardOptions: CardOption[] = [
    {
      title: 'Crear Oferta',
      icon: 'fa-solid fa-business-time',
      buttonText: 'Acción 1',
    },
    { title: 'Ver Ofertas', icon: 'fa-solid fa-eye', buttonText: 'Acción 2' },
    {
      title: 'Ver usuarios',
      icon: 'fa-solid fa-users',
      buttonText: 'Acción 2',
    },
    {
      title: 'Ver Matches',
      icon: 'fa-solid fa-heart-circle-check',
      buttonText: 'Acción 2',
    },
    { title: 'Ver Perfil', icon: 'fa-solid fa-cog', buttonText: 'Acción 2' },
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
}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';

@Component({
  selector: 'app-home-opportunity',
  standalone: true,
  imports: [HeaderComponent, SideNavComponent],
  templateUrl: './home-opportunity.component.html',
  styleUrl: './home-opportunity.component.css',
})
export class HomeOpportunityComponent {}

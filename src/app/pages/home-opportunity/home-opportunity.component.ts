import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home-opportunity',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home-opportunity.component.html',
  styleUrl: './home-opportunity.component.css',
})
export class HomeOpportunityComponent {}

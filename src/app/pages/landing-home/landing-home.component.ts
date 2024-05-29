import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MainComponent } from '../../components/main/main.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.css',
})
export class LandingHomeComponent {}

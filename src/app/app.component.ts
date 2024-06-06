import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRoleDirective } from './core/directives/userRole/userRole.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserRoleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'talento-tech-frontend';
}

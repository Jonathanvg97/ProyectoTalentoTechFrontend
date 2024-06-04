import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-options',
  standalone: true,
  imports: [],
  templateUrl: './card-options.component.html',
  styleUrl: './card-options.component.css'
})
export class CardOptionsComponent {
  @Input() title: string = '';
  @Input() icon: string = 'fa-solid fa-business-time';
  @Input() buttonText: string = 'Acción';
}

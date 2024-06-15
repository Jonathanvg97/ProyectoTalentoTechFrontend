import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-off-canvas',
  standalone: true,
  imports: [],
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.css'
})
export class OffCanvasComponent {
  @Input() offCanvasOpen: boolean = false;

}

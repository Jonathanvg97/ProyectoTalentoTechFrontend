import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-create-use',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-create-user.component.html',
  styleUrl: './form-create-user.component.css',
})
export class FormCreateUserComponent implements OnInit {
  ngOnInit(): void {}
}

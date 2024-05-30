import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users/users.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { userCreateInterface } from '../../core/interface/usuario.interface';
import { passwordRegex } from '../../helpers/validatePassword.helper';

@Component({
  selector: 'app-form-create-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './form-create-user.component.html',
  styleUrls: ['./form-create-user.component.css'],
})
export class FormCreateUserComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['user', Validators.required],
      clientType: [null, Validators.required],
    });
  }

  onSubmit(): void {
    Object.values(this.createUserForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.createUserForm.valid) {
      const data = this.createUserForm.value;
      const newUser: userCreateInterface = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        clientType: data.clientType,
      };

      this.usersService.createUser(newUser).subscribe(
        (resp: any) => {
          console.log(resp);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error creating user', error);
        }
      );
    }
  }
}

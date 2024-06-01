import { clientTypes } from './../../core/enum/clientTypes.utils';
import { passwordRegex } from './../../helpers/validatePassword.helper';
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
import { ToastrService } from 'ngx-toastr';
import {
  toasterErrorConfig,
  toasterSuccessConfig,
} from '../../helpers/toaster.helper';

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
  isCreate: boolean = false;
  errorMessage: string = '';
  clientTypes = clientTypes;
  clientTypeKeys: number[];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get userForm() {
    return this.createUserForm.controls;
  }

  ngOnInit(): void {
    this.clientTypeKeys = Object.keys(this.clientTypes).map(Number);
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      role: ['user', Validators.required],
      clientType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isCreate = true;
    this.errorMessage = '';
    if (this.createUserForm.invalid) {
      return;
    }

    const data = this.createUserForm.value;
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      clientType: data.clientType,
    };

    this.usersService.createUser(newUser).subscribe(
      (resp: any) => {
        // Mostrar la alerta solo si la creación del usuario fue exitosa
        this.toastr.success(
          'Usuario creado exitosamente.',
          'Success',
          toasterSuccessConfig('Usuario creado exitosamente.')
        );

        console.log(resp);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error creating user', error);
        // Manejar el mensaje de error específico
        if (error.error && error.error.msg === 'Correo ya registrado') {
          this.errorMessage = 'Este correo ya se está usando, ingresa otro';
        } else {
          this.errorMessage =
            'Error al crear el usuario. Inténtalo nuevamente.';
        }
        // Mostrar la alerta de error
        this.toastr.error(this.errorMessage, 'Error', toasterErrorConfig());
      }
    );
  }
}

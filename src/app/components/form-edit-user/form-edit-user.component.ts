import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { clientTypes } from '../../core/enum/clientTypes.utils';
import {
  toasterErrorConfig,
  toasterSuccessConfig,
} from '../../helpers/toaster.helper';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { userCreateInterface } from '../../core/interface/user.interface';
import { first } from 'rxjs';
import { passwordRegex } from '../../helpers/validatePassword.helper';

@Component({
  selector: 'app-form-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SideNavComponent],
  templateUrl: './form-edit-user.component.html',
  styleUrls: ['./form-edit-user.component.css'],
})
export class FormEditUserComponent implements OnInit {
  editForm: FormGroup;
  isEdit: boolean = false;
  errorMessage: string = '';
  clientTypes = clientTypes;
  clientTypeKeys: number[];
  userId: string | null = null;
  currentPassword: string = ''; // Variable para almacenar la contraseña actual

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  get userForm() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    this.clientTypeKeys = Object.keys(this.clientTypes).map(Number);
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern(passwordRegex)]], // Input para mostrar la contraseña actual
      role: ['', Validators.required],
      clientType: ['', Validators.required],
    });
    this.route.params.subscribe((params: { [key: string]: string }) => {
      this.userId = params['id'];
      if (this.userId) {
        this.loadUserData();
      }
    });

  }

  loadUserData(): void {
    this.usersService
      .getDetailByUserId(this.userId!)
      .pipe(first())
      .subscribe(
        (response) => {
          const user = response.user;
          this.currentPassword = user.password; // Almacenar la contraseña actual
          this.editForm.patchValue({
            name: user.name,
            email: user.email,
            password: this.currentPassword, // Mostrar la contraseña actual en el input
            role: user.role,
            clientType: user.clientType,
          });
        },
        (error) => {
          console.error('Error loading user data:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.userId) {
      this.isEdit = true;
      this.errorMessage = '';
      if (this.editForm.invalid) {
        return;
      }

      const data = this.editForm.value;
      const updateUser: userCreateInterface = {
        _id: this.userId,
        name: data.name,
        email: data.email,
        password: '', // Inicializar la contraseña como vacía
        role: data.role,
        clientType: data.clientType,
      };

      // Check if the password has been modified
      if (data.password !== this.currentPassword) {
        updateUser.password = data.password;
      } else {
        // No enviar la contraseña si no ha sido modificada
        delete updateUser.password;
      }

      this.usersService.updateUserById(this.userId, updateUser).subscribe(
        (resp: any) => {
          this.toastr.success(
            'Usuario actualizado exitosamente.',
            'Success',
            toasterSuccessConfig('Usuario actualizado exitosamente.')
          );
          this.router.navigate(['/homeOpportunity']);
        },
        (error) => {
          this.errorMessage = 'No se pudo actualizar el usuario.';
          this.toastr.error(this.errorMessage, 'Error', toasterErrorConfig());
        }
      );
    }
  }
}

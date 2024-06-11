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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { clientTypes } from '../../core/enum/clientTypes.utils';
import { LoginService } from '../../services/auth/login.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get userForm() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    this.clientTypeKeys = Object.keys(this.clientTypes).map(Number);
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: [''],
      password: ['', [Validators.pattern(passwordRegex)]],
      role: ['', Validators.required],
      clientType: ['', Validators.required],
    });

    this.loginService
      .getUserIdFromToken()
      .pipe(first())
      .subscribe((id) => {
        this.userId = id;
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
          // console.log('User Data:', user);
          this.editForm.patchValue({
            name: user.name,
            email: user.email,
            password: user.password,
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
        password: '',
        role: data.role,
        clientType: data.clientType,
      };

      // Check if new password is different from old password
    if (data.password !== data.oldPassword) {
      updateUser.password = data.password;
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

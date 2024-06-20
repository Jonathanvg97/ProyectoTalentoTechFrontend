import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { passwordRegex } from '../../helpers/validatePassword.helper';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HeaderComponent, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isReset: boolean = false;
  private token: string;
  passwordsMatch: boolean = true;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private loginService = inject(LoginService);

  get formResetPassword() {
    return this.resetForm.controls;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        console.error('No token provided in the URL');
        this.router.navigate(['/login']);
      }
    });
    this.createFormResetPassword();
    this.onChanges();
  }

  createFormResetPassword() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(passwordRegex)],
      ],
    });
  }

  onChanges(): void {
    this.resetForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.passwordsMatch =
        this.resetForm.get('password')?.value ===
        this.resetForm.get('confirmPassword')?.value;
    });
  }

  onSubmit(): void {
    this.isReset = true;
    if (this.resetForm.invalid || !this.passwordsMatch) {
      console.error('Form is invalid or passwords do not match');
      return;
    }

    const password = this.resetForm.get('password')!.value;
    this.loginService.resetPassword(this.token, password).subscribe({
      next: (resp: any) => {
        if (resp) {
          Swal.fire({
            html: 'Contraseña actualizada exitosamente',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            html: 'Hubo un error al actualizar la contraseña',
          });
        }
      },
    });
  }
}

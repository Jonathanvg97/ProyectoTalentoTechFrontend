import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  isForget: boolean = false;

  private formBuilder = inject(FormBuilder);
  private loginServices = inject(LoginService);
  private router = inject(Router);
  get formForgetPassword() {
    return this.forgetForm.controls;
  }

  ngOnInit(): void {
    this.createFormForgetPassword();
  }

  createFormForgetPassword() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  handleForgetPassword() {
    this.isForget = true;

    if (this.forgetForm.invalid) {
      return;
    }

    const data = this.forgetForm.value;

    this.loginServices.forgetPassword(data).subscribe({
      next: (resp: any) => {
        if (resp) {
          Swal.fire({
            html: `Correo enviado exitosamente , revisa la bandeja de entrada de ${data.email}`,
          }).then(() => {
            this.router.navigateByUrl(PATH.LOGIN);
          });
        } else {
          Swal.fire({
            html: 'Correo Invalido',
          });
        }
      },
    });
  }
}

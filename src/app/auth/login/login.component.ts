import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordRegex } from '../../helpers/validatePassword.helper';
import { LoginInterface } from '../../core/interface/login.interface';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean = false;

  private formBuilder = inject(FormBuilder);
  private loginServices = inject(LoginService);
  private router = inject(Router);

  get formLogin() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
    });
  }

  logIn() {
    this.isLogin = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    const loginData: LoginInterface = {
      email: data.email,
      password: data.password,
    };

    this.loginServices.loginUser(loginData).subscribe({
      next: (resp: any) => {
        if (resp && resp.user) {
          console.log(resp);
          const { name } = resp.user;
          Swal.fire({
            html: `Bienvenido ${name}`,
          }).then(() => {
            this.router.navigateByUrl(PATH.HOMEOPPORTUNITY);
          });
        }
      },

      error: (error: any) => {
        Swal.fire({
          html: ` ${error.error.msg}`,
          icon: 'warning',
        });
        console.error(error.error.msg);
      },
    });
  }
}

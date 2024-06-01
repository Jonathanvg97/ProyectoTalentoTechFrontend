import { LoginService } from './../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() showLoginButton: boolean = false;
  @Input() showBakcButton: boolean = false;
  @Input() showSingUpButton: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  logOut() {
    const userId = this.loginService.user?._id;
    if (userId) {
      this.loginService.logout(userId).subscribe({
        next: () => {
          Swal.fire({
            html: 'Sesión Cerrada',
          }).then(() => {
            this.router.navigateByUrl(PATH.HOME);
          });
        },
        error: (error: any) => {
          Swal.fire({
            html: ` ${error.error.msg}`,
          });
        },
      });
    } else {
      Swal.fire({
        html: 'Error: Usuario no está definido.',
      });
    }
  }
}

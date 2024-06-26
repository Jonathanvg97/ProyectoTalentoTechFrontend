import { Component, OnInit, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { OffCanvasComponent } from '../offCanvas/off-canvas/off-canvas.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, CommonModule, UserRoleDirective, OffCanvasComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;
  offCanvasOpen = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.usersService
          .getDetailByUserId(this.userId)
          .subscribe((userDetail) => {
            this.userName = userDetail.user.name;
          });
      }
    });
  }

  logOut(): void {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.loginService.logout(this.userId).subscribe({
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
    });
  }

  handleShowOffCanvas() {
    this.offCanvasOpen = !this.offCanvasOpen;
    console.log(this.offCanvasOpen)
  }
}

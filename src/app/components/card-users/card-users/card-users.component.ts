import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { clientTypes } from '../../../core/enum/clientTypes.utils';
import { userCreateInterface } from '../../../core/interface/user.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { toasterSuccessConfig } from '../../../helpers/toaster.helper';

@Component({
  selector: 'app-card-users',
  standalone: true,
  imports: [SideNavComponent, CommonModule, RouterLink],
  templateUrl: './card-users.component.html',
  styleUrl: './card-users.component.css',
})
export class CardUsersComponent implements OnInit {
  user: any[] = [];
  usersData: userCreateInterface[] = [];

  constructor(
    private toastr: ToastrService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.user = response.users;
      this.usersData = this.user.filter((user: any) => user.role === 'user');
    });
  }

  getClientTypeLabel(clientType: number | undefined): string {
    if (clientType !== undefined && clientTypes.hasOwnProperty(clientType)) {
      return clientTypes[clientType].join(', ');
    } else {
      return 'No definido';
    }
  }

  deleteUserByID(userId: string) {
    Swal.fire({
      html: 'Estás seguro de eliminar a este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(userId).subscribe((response) => {
          this.loadUsers();
          this.toastr.success(
            'Cliente eliminado exitosamente',
            '',
            toasterSuccessConfig('')
          );
        });
      }
      error: (error: any) => {
        Swal.fire({
          html: ` ${error.error.msg}`,
          icon: 'warning',
        });
      };
    });
  }

  viewUserProfile(userId: string) {
    this.router.navigate(['/userById/', userId]);
  }
}

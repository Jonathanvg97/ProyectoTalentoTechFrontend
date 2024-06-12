import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { clientTypes } from '../../../core/enum/clientTypes.utils';
import { userCreateInterface } from '../../../core/interface/user.interface';

@Component({
  selector: 'app-card-users',
  standalone: true,
  imports: [SideNavComponent, CommonModule],
  templateUrl: './card-users.component.html',
  styleUrl: './card-users.component.css',
})
export class CardUsersComponent implements OnInit {
  user: any[] = [];
  usersData: userCreateInterface[] = [];

  constructor(
    private toastr: ToastrService,
    private userService: UsersService
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
}

import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { clientTypes } from '../../core/enum/clientTypes.utils';
import { FormEditUserComponent } from '../form-edit-user/form-edit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-detail-user',
  standalone: true,
  imports: [SideNavComponent, FormEditUserComponent],
  templateUrl: './card-detail-user.component.html',
  styleUrl: './card-detail-user.component.css',
})
export class CardDetailUserComponent implements OnInit {
  userId: string | null = null;
  userDetail: { ok: boolean; msg: string; user: any } | null = null;

  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.usersService.getDetailByUserId(this.userId).subscribe((user) => {
          this.userDetail = user;
          console.log(this.userDetail);
        });
      }
    });
  }

  onEdit(): void {
    if (this.userId) {
      this.router.navigate(['/editUser']);
    }
  }

  getClientTypeLabel(clientType: number | undefined): string {
    if (clientType !== undefined && clientTypes.hasOwnProperty(clientType)) {
      return clientTypes[clientType].join(', ');
    } else {
      return 'No definido';
    }
  }
}

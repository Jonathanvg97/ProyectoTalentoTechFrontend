import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { clientTypes } from '../../core/enum/clientTypes.utils';

@Component({
  selector: 'app-card-detail-user',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './card-detail-user.component.html',
  styleUrl: './card-detail-user.component.css',
})
export class CardDetailUserComponent implements OnInit {
  userId: string | null = null;
  userDetail: { ok: boolean, msg: string, user: any } | null = null;

  constructor(
    private loginService: LoginService,
    private usersService: UsersService
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

  getClientTypeLabel(clientType: number | undefined): string {
    if (clientType !== undefined && clientTypes.hasOwnProperty(clientType)) {
      return clientTypes[clientType].join(', ');
    } else {
      return 'No definido'; 
    }
  }
}


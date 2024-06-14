import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { clientTypes } from '../../core/enum/clientTypes.utils';
import { FormEditUserComponent } from '../form-edit-user/form-edit-user.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el userId de la URL
    this.route.params.subscribe((params: { [key: string]: string }) => {
      this.userId = params['id']; // 'id' debe coincidir con el nombre del parámetro en la ruta
      if (this.userId) {
        // Obtener detalles del usuario usando el userId
        this.usersService.getDetailByUserId(this.userId).subscribe((user) => {
          this.userDetail = user;
          // console.log(this.userDetail);
        });
      }
    });
  }

  onEdit(): void {
    if (this.userId) {
      this.router.navigate([`/editUser/${this.userId}`]);
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

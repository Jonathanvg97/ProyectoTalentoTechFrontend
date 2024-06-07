import { businessInterface } from './../../core/interface/business.interface';
import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { IndustryTypesPipe } from '../../pipes/industry-types.pipe';
import Swal from 'sweetalert2';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { CardDetailBusinessComponent } from '../card-detail-business/card-detail-business.component';
import { ToastrService } from 'ngx-toastr';
import {
  toasterErrorConfig,
  toasterSuccessConfig,
} from '../../helpers/toaster.helper';
import { BusinessDetailsService } from '../../services/business/busines-details.service';

@Component({
  selector: 'app-card-business',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    IndustryTypesPipe,
    UserRoleDirective,
    CardDetailBusinessComponent,
  ],
  templateUrl: './card-business.component.html',
  styleUrl: './card-business.component.css',
})
export class CardBusinessComponent implements OnInit, OnDestroy {
  business: businessInterface[] = [];
  businessSelected: businessInterface | null = null;
  businessSubscription: Subscription;
  errorMessage: string = '';

  constructor(
    private businessService: BusinessService,
    private businessDetailsService: BusinessDetailsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBusiness();
  }

  ngOnDestroy(): void {
    this.businessSubscription?.unsubscribe();
  }

  loadBusiness() {
    this.businessSubscription = this.businessService
      .getAllBusiness()
      .subscribe((resp: any) => {
        // console.log(resp); //
        this.business = resp.businessOpportunity;
        // console.log(this.business);
      });
  }

  viewBusiness(id?: string) {
    if (!id) {
      console.error('El ID de la oferta no está definido');
      return;
    }
    this.businessService.getByIdBusiness(id).subscribe({
      next: (resp: any) => {
        this.businessDetailsService.setBusinessDetails(resp.oportunity); // Almacena los detalles del negocio
        this.toastr.success(
          `Oportunidad de negocio encontrada exitosamente`,
          'Success',
          toasterSuccessConfig('')
        );
        this.router.navigateByUrl(`/detailBusiness/${id}`);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(
          this.errorMessage,
          'Error al obtener la oportunidad de negocio',
          toasterErrorConfig()
        );
      },
    });
  }

  editBusiness(id?: string) {
    if (!id) {
      console.error('El ID de la oferta no está definido');
      return;
    }
      this.router.navigate([`/editBusiness/${id}`]);
  }
  

  deleteBusiness(id?: string) {
    if (!id) {
      console.error('El ID del negocio no está definido');
      return;
    }

    Swal.fire({
      html: 'Estás seguro de eliminar este negocio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.businessService.deleteByIdBusiness(id).subscribe({
          next: (resp: any) => {
            Swal.fire({
              html: 'Negocio eliminado exitosamente',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            });
            this.loadBusiness();
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              html: 'Hubo un error al eliminar el negocio',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
          },
        });
      }
    });
  }
}

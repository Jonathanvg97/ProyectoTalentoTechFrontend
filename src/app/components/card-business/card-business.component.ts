import { map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';
import { Router } from '@angular/router';
import { Subscription, forkJoin, Observable } from 'rxjs';
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
import { UsersService } from '../../services/users/users.service';
import { MatchesService } from '../../services/matches/matches.service';
import { LoginService } from '../../services/auth/login.service';
import { businessInterface } from '../../core/interface/business.interface';

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
  styleUrls: ['./card-business.component.css'],
})
export class CardBusinessComponent implements OnInit, OnDestroy {
  business: businessInterface[] = [];
  unmatchedBusiness: businessInterface[] = [];
  businessSubscription: Subscription;
  userId: string | null = null;
  userRole: string | null = null;
  errorMessage: string = '';
  userAdminDetails: any;
  constructor(
    private businessService: BusinessService,
    private businessDetailsService: BusinessDetailsService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UsersService,
    private matchesService: MatchesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getUserRoleFromToken().subscribe((role) => {
      if (role === 'user') {
        this.loadUserAndBusiness();
      } else {
        this.loadPublicationsByAdmin();
      }
    });
  }

  ngOnDestroy(): void {
    this.businessSubscription?.unsubscribe();
  }
  loadUserAndBusiness() {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.userService
          .getDetailByUserId(this.userId)
          .subscribe((user: any) => {
            const matchIds = user.user.matches;
            if (matchIds.length > 0) {
              const matchDetailsObservables: Observable<any>[] = matchIds.map(
                (matchId: string): Observable<any> =>
                  this.matchesService.getMatchById(matchId)
              );
              forkJoin(matchDetailsObservables).subscribe(
                (matchDetailsArray: any[]) => {
                  // Obtener los businessIds de las ofertas con las que ha hecho match el usuario
                  const matchedBusinessIds = matchDetailsArray.map(
                    (matchDetails: any) =>
                      matchDetails.match.business.businessId
                  );

                  // Cargar todas las ofertas
                  this.businessService
                    .getAllBusiness()
                    .subscribe((resp: any) => {
                      this.business = resp.businessOpportunity;
                      // Filtrar las ofertas para encontrar las que no ha hecho match
                      this.unmatchedBusiness = this.business.filter(
                        (business) => {
                          // Comprobar si el ID del negocio no está en los IDs de negocios con match
                          const isMatched = matchedBusinessIds.includes(
                            business._id
                          );
                          // Retornar true si no se encontró coincidencia, es decir, si no ha hecho match
                          return !isMatched;
                        }
                      );
                    });
                }
              );
            } else {
              // Si no hay matches, cargar todas las ofertas
              this.loadAllBusiness();
            }
          });
      }
    });
  }

  loadPublicationsByAdmin() {
    this.loginService.getUserIdFromToken().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.userService
          .getDetailByUserId(this.userId)
          .subscribe((resp: any) => {
            const createdBusinessIds = resp.user.createdBusinesses.map(
              (business: any) => business
            );

            // console.log(createdBusinessIds);

            this.businessService.getAllBusiness().subscribe((resp: any) => {
              this.business = resp.businessOpportunity;
              this.unmatchedBusiness = this.business.filter((business: any) => {
                // Comprobar si el ID del negocio no está en los IDs de negocios creados por el usuario
                const idBusiness = createdBusinessIds.includes(business._id);
                return idBusiness;
              });
            });
          });
      }
    });
  }

  loadAllBusiness() {
    this.businessSubscription = this.businessService
      .getAllBusiness()
      .subscribe((resp: any) => {
        this.business = resp.businessOpportunity;
        this.unmatchedBusiness = [...this.business]; // Mostrar todas las ofertas
      });
  }

  viewBusiness(id?: string) {
    if (!id) {
      console.error('El ID de la oferta no está definido');
      return;
    }
    this.businessService.getByIdBusiness(id).subscribe({
      next: (resp: any) => {
        this.businessDetailsService.setBusinessDetails(resp.oportunity);
        this.toastr.success(
          `Oportunidad de negocio encontrada exitosamente`,
          '',
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
            // this.loadBusiness();
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

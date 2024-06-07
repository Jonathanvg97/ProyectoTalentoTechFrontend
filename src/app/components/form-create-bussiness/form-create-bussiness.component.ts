import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toasterErrorConfig, toasterSuccessConfig } from '../../helpers/toaster.helper';
import { BusinessService } from '../../services/business/business.service';
import { businessTypes } from '../../core/enum/businessTypes.utils';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-create-bussiness',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,],
  templateUrl: './form-create-bussiness.component.html',
  styleUrls: ['./form-create-bussiness.component.css'],
})
export class FormCreateBussinessComponent implements OnInit {
  createBusinessForm: FormGroup;
  isCreate: boolean = true;
  errorMessage: string = '';
  businessTypes = businessTypes;
  businessTypesKeys: number[];
  businessId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  get businessForm() {
    return this.createBusinessForm.controls;
  }

  ngOnInit(): void {
    this.businessTypesKeys = Object.keys(this.businessTypes).map(Number);
    this.createBusinessForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', Validators.required],
      industry: ['', Validators.required],
    });

    // Check if we are editing an existing business
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isCreate = false;
        this.businessId = params['id'];
        if (this.businessId) {
          this.loadBusinessData(this.businessId); // Cargar datos del negocio cuando estás en modo de edición
        }
      }
    });
  }

  loadBusinessData(id: string): void {
    this.businessService.getByIdBusiness(id).subscribe((response: any) => {
      const opportunity = response.oportunity; // Extraer el objeto 'oportunity' de la respuesta
      // console.log('Datos del negocio:', opportunity); 
      this.createBusinessForm.patchValue(opportunity); // Asignr los datos al formulario
    });
  }
  
  

  onSubmit(): void {
    this.errorMessage = '';
    if (this.createBusinessForm.invalid) {
      return;
    }

    const data = this.createBusinessForm.value;
    const businessData = {
      title: data.title,
      description: data.description,
      status: data.status,
      industry: data.industry,
    };

    if (this.isCreate) {
      this.businessService.createBusiness(businessData).subscribe(
        (resp: any) => {
          this.toastr.success(
            `La oferta ${businessData.title} fue creada con éxito`,
            'Success',
            toasterSuccessConfig('La oferta fue creada con éxito')
          );
          this.router.navigate(['/homeOpportunity']);
        },
        (error) => {
          console.error('Error creating business', error);

          if (error.status === 400) {
            this.errorMessage = error.error.msg;
          } else {
            this.errorMessage = 'Error creating business';
          }

          this.toastr.error(
            this.errorMessage,
            'Error creating business',
            toasterErrorConfig()
          );
        }
      );
    } else {
      if (this.businessId) {
        this.businessService
          .editBusiness(this.businessId, businessData)
          .subscribe(
            (resp: any) => {
              this.toastr.success(
                `La oferta ${businessData.title} fue actualizada con éxito`,
                'Success',
                toasterSuccessConfig('La oferta fue actualizada con éxito')
              );
              this.router.navigate(['/homeOpportunity']);
            },
            (error) => {
              console.error('Error updating business', error);

              if (error.status === 400) {
                this.errorMessage = error.error.msg;
              } else {
                this.errorMessage = 'Error updating business';
              }

              this.toastr.error(
                this.errorMessage,
                'Error updating business',
                toasterErrorConfig()
              );
            }
          );
      }
    }
  }
}

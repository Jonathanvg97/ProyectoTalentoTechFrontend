import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  toasterErrorConfig,
  toasterSuccessConfig,
} from '../../helpers/toaster.helper';
import { BusinessService } from '../../services/business/business.service';
import { businessTypes } from '../../core/enum/businessTypes.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-bussiness',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-create-bussiness.component.html',
  styleUrl: './form-create-bussiness.component.css',
})
export class FormCreateBussinessComponent implements OnInit {
  createBusinessForm: FormGroup;
  isCreate: boolean = false;
  errorMessage: string = '';
  businessTypes = businessTypes;
  businessTypesKeys: number[];

  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private router: Router,
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
  }

  onSubmit(): void {
    this.isCreate = true;
    this.errorMessage = '';
    if (this.createBusinessForm.invalid) {
      return;
    }

    const data = this.createBusinessForm.value;
    const newBusiness = {
      title: data.title,
      description: data.description,
      status: data.status,
      industry: data.industry,
    };

    this.businessService.createBusiness(newBusiness).subscribe(
      (resp: any) => {
        this.toastr.success(
          `La oferta ${newBusiness.title} fue creada con exito`,
          'Success',
          toasterSuccessConfig('La oferta fue creada con exito')
        );
        console.log(resp);
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
  }
}

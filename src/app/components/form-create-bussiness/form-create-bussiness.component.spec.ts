import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateBussinessComponent } from './form-create-bussiness.component';

describe('FormCreateBussinessComponent', () => {
  let component: FormCreateBussinessComponent;
  let fixture: ComponentFixture<FormCreateBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateBussinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

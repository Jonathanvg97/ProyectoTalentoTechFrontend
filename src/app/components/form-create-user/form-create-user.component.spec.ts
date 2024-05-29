import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateUseComponent } from './form-create-user.component';

describe('FormCreateUseComponent', () => {
  let component: FormCreateUseComponent;
  let fixture: ComponentFixture<FormCreateUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateUseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

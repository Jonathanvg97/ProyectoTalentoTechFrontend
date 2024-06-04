import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionsComponent } from './card-options.component';

describe('CardOptionsComponent', () => {
  let component: CardOptionsComponent;
  let fixture: ComponentFixture<CardOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

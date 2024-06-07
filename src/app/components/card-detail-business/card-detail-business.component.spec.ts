import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailBusinessComponent } from './card-detail-business.component';

describe('CardDetailBusinessComponent', () => {
  let component: CardDetailBusinessComponent;
  let fixture: ComponentFixture<CardDetailBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

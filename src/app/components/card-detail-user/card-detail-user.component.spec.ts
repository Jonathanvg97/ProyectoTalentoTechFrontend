import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailUserComponent } from './card-detail-user.component';

describe('CardDetailUserComponent', () => {
  let component: CardDetailUserComponent;
  let fixture: ComponentFixture<CardDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

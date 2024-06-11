import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailMatchesComponent } from './card-detail-matches.component';

describe('CardDetailMatchesComponent', () => {
  let component: CardDetailMatchesComponent;
  let fixture: ComponentFixture<CardDetailMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailMatchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

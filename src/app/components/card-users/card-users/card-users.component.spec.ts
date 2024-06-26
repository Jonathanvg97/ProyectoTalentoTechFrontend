import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUsersComponent } from './card-users.component';

describe('CardUsersComponent', () => {
  let component: CardUsersComponent;
  let fixture: ComponentFixture<CardUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

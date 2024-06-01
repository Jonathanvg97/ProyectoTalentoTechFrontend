import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOpportunityComponent } from './home-opportunity.component';

describe('HomeOpportunityComponent', () => {
  let component: HomeOpportunityComponent;
  let fixture: ComponentFixture<HomeOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOpportunityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

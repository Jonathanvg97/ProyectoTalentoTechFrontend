import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsByUserComponent } from './notifications-by-user.component';

describe('NotificationsByUserComponent', () => {
  let component: NotificationsByUserComponent;
  let fixture: ComponentFixture<NotificationsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsByUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReservationComponent } from './approve-reservation.component';

describe('ApproveReservationComponent', () => {
  let component: ApproveReservationComponent;
  let fixture: ComponentFixture<ApproveReservationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApproveReservationComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

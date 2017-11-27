import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '../../core/alert/alert.service';
import { ApproveReservationComponent } from './approve-reservation.component';
import { ApproveReservationService } from './approve-reservation.service';

class MockApproveReservationService {}

class MockAlertService {}

describe('ApproveReservationComponent', () => {
  let component: ApproveReservationComponent;
  let fixture: ComponentFixture<ApproveReservationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [ApproveReservationComponent],
        providers: [
          { provide: ApproveReservationService, useClass: MockApproveReservationService },
          { provide: AlertService, useClass: MockAlertService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
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

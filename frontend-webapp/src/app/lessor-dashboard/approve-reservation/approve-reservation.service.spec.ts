import { TestBed, inject } from '@angular/core/testing';

import { ApproveReservationService } from './approve-reservation.service';

describe('ApproveReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproveReservationService]
    });
  });

  it('should be created', inject([ApproveReservationService], (service: ApproveReservationService) => {
    expect(service).toBeTruthy();
  }));
});

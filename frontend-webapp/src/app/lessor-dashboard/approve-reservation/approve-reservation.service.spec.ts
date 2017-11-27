import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ApproveReservationService } from './approve-reservation.service';

describe('ApproveReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApproveReservationService]
    });
  });

  it(
    'should be created',
    inject([ApproveReservationService], (service: ApproveReservationService) => {
      expect(service).toBeTruthy();
    })
  );
});

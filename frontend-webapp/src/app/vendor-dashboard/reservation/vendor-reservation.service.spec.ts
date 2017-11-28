import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VendorReservationService } from './vendor-reservation.service';

describe('VendorReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorReservationService]
    });
  });

  it(
    'should be created',
    inject([VendorReservationService], (service: VendorReservationService) => {
      expect(service).toBeTruthy();
    })
  );
});

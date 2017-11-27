import { inject, TestBed } from '@angular/core/testing';

import { VendorReservationService } from './vendor-reservation.service';

describe('VendorReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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

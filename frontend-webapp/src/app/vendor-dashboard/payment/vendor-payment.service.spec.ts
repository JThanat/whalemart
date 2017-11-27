import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { VendorReservationService } from '../reservation/vendor-reservation.service';
import { VendorPaymentService } from './vendor-payment.service';

describe('VendorPaymentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VendorPaymentService,
        {
          provide: VendorReservationService,
        }
      ]
    });
  });

  it(
    'should be created',
    inject([VendorPaymentService], (service: VendorPaymentService) => {
      expect(service).toBeTruthy();
    })
  );
});

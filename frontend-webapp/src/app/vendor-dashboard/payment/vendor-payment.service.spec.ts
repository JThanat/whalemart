import { inject, TestBed } from '@angular/core/testing';

import { VendorPaymentService } from './vendor-payment.service';

describe('VendorPaymentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorPaymentService]
    });
  });

  it('should be created', inject([VendorPaymentService], (service: VendorPaymentService) => {
    expect(service).toBeTruthy();
  }));
});

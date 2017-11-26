import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VendorPaymentService } from './vendor-payment.service';

describe('VendorPaymentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorPaymentService]
    });
  });

  it('should be created', inject([VendorPaymentService], (service: VendorPaymentService) => {
    expect(service).toBeTruthy();
  }));
});

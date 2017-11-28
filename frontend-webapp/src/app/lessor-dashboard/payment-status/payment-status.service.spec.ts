import { TestBed, inject } from '@angular/core/testing';

import { PaymentStatusService } from './payment-status.service';

describe('PaymentStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentStatusService]
    });
  });

  it('should be created', inject([PaymentStatusService], (service: PaymentStatusService) => {
    expect(service).toBeTruthy();
  }));
});

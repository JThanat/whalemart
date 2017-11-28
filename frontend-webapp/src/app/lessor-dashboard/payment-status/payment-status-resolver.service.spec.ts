import { inject, TestBed } from '@angular/core/testing';

import { PaymentStatusResolver } from './payment-status-resolver.service';

describe('PaymentStatusResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentStatusResolver]
    });
  });

  it('should be created', inject([PaymentStatusResolver], (service: PaymentStatusResolver) => {
    expect(service).toBeTruthy();
  }));
});

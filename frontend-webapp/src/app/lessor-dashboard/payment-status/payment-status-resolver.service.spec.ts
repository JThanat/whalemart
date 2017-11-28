import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentStatusResolver } from './payment-status-resolver.service';

describe('PaymentStatusResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentStatusResolver]
    });
  });

  it('should be created', inject([PaymentStatusResolver], (service: PaymentStatusResolver) => {
    expect(service).toBeTruthy();
  }));
});

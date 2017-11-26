import { TestBed, inject } from '@angular/core/testing';

import { ReceiptService } from './receipt.service';

describe('ReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptService]
    });
  });

  it('should be created', inject([ReceiptService], (service: ReceiptService) => {
    expect(service).toBeTruthy();
  }));
});

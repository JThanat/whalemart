import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ReceiptService } from './receipt.service';

describe('ReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReceiptService]
    });
  });

  it(
    'should be created',
    inject([ReceiptService], (service: ReceiptService) => {
      expect(service).toBeTruthy();
    })
  );
});

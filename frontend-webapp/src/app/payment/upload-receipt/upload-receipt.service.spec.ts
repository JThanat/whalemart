import { inject, TestBed } from '@angular/core/testing';

import { UploadReceiptService } from './upload-receipt.service';

describe('UploadReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadReceiptService]
    });
  });

  it('should be created', inject([UploadReceiptService], (service: UploadReceiptService) => {
    expect(service).toBeTruthy();
  }));
});

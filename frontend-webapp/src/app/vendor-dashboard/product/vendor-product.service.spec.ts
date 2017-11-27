import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { VendorProductService } from './vendor-product.service';

describe('VendorProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorProductService]
    });
  });

  it(
    'should be created',
    inject([VendorProductService], (service: VendorProductService) => {
      expect(service).toBeTruthy();
    })
  );
});

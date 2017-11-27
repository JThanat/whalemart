import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { VendorProfileService } from './vendor-profile.service';

describe('VendorProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendorProfileService]
    });
  });

  it('should be created', inject([VendorProfileService], (service: VendorProfileService) => {
    expect(service).toBeTruthy();
  }));
});

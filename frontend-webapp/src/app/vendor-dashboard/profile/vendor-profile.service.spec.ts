import { TestBed, inject } from '@angular/core/testing';

import { VendorProfileService } from './vendor-profile.service';

describe('VendorProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorProfileService]
    });
  });

  it('should be created', inject([VendorProfileService], (service: VendorProfileService) => {
    expect(service).toBeTruthy();
  }));
});

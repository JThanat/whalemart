import { TestBed, inject } from '@angular/core/testing';

import { BoothsDataResolverService } from './booths-data-resolver.service';

describe('BoothsDataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoothsDataResolverService]
    });
  });

  it('should be created', inject([BoothsDataResolverService], (service: BoothsDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});

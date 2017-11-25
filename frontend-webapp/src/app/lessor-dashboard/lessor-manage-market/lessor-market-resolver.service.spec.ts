import { inject, TestBed } from '@angular/core/testing';

import { LessorMarketResolverService } from './lessor-market-resolver.service';

describe('LessorMarketResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessorMarketResolverService]
    });
  });

  it(
    'should be created',
    inject([LessorMarketResolverService], (service: LessorMarketResolverService) => {
      expect(service).toBeTruthy();
    })
  );
});

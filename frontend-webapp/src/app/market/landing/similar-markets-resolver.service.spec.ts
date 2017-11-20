import { inject, TestBed } from '@angular/core/testing';

import { SimilarMarketsResolver } from './similar-markets-resolver.service';

describe('SimilarMarketsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimilarMarketsResolver]
    });
  });

  it('should be created', inject([SimilarMarketsResolver], (service: SimilarMarketsResolver) => {
    expect(service).toBeTruthy();
  }));
});

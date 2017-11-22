import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { MarketService } from '../../core/market/market.service';
import { SimilarMarketsResolver } from './similar-markets-resolver.service';

class MockMarketService {
  normalizeMarket = (market: any) => market;
}

describe('SimilarMarketsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimilarMarketsResolver, { provide: MarketService, useClass: MockMarketService }]
    });
  });

  it(
    'should be created',
    inject([SimilarMarketsResolver], (service: SimilarMarketsResolver) => {
      expect(service).toBeTruthy();
    })
  );
});

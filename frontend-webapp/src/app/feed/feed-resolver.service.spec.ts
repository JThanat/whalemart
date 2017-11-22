import { inject, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { MarketFeed, MarketService } from '../core/market/market.service';
import { FeedResolver } from './feed-resolver.service';

class MockMarketService {
  getFeed() { }
}

const testMarketFeed: MarketFeed = {
  recommended: [],
  recentlyAdded: [],
  night: [],
  winter: []
};

describe('FeedResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedResolver,
        { provide: MarketService, useClass: MockMarketService }
      ]
    });
  });

  it('should return a feed data from MarketService', inject(
    [FeedResolver, MarketService],
    (uut: FeedResolver, marketService: MockMarketService) => {
      const getFeedSpy = spyOn(marketService, 'getFeed')
        .and.returnValue(observableOf(testMarketFeed));

      const resultSpy = jasmine.createSpy();
      uut.resolve().subscribe(resultSpy);

      expect(getFeedSpy).toHaveBeenCalledTimes(1);
      expect(resultSpy).toHaveBeenCalledWith(testMarketFeed);
    })
  );
});

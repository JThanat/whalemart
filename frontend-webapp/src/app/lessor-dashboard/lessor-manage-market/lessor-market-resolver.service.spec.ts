import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';

import { LessorService, MarketList } from '../lessor.service';
import { LessorMarketResolverService } from './lessor-market-resolver.service';

class MockLessorService {
  getMarketList(): Observable<MarketList> {
    return observableOf({
      upcomingMarkets: [],
      passedMarkets: []
    });
  }
}

describe('LessorMarketResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LessorMarketResolverService,
        { provide: LessorService, useClass: MockLessorService }
      ]
    });
  });

  it(
    'should be created',
    inject([LessorMarketResolverService], (service: LessorMarketResolverService) => {
      expect(service).toBeTruthy();
    })
  );
});

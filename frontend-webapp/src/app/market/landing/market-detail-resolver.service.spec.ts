import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { TimeService } from '../../core/utils/time.service';
import { MarketDetailResolver } from './market-detail-resolver.service';

describe('MarketDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarketDetailResolver, TimeService]
    });
  });

  it(
    'should be created',
    inject([MarketDetailResolver], (service: MarketDetailResolver) => {
      expect(service).toBeTruthy();
    })
  );
});

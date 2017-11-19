import { inject, TestBed } from '@angular/core/testing';

import { MarketDetailResolver } from './market-detail-resolver.service';

describe('MarketDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketDetailResolver]
    });
  });

  it('should be created', inject([MarketDetailResolver], (service: MarketDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});

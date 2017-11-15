import { inject, TestBed } from '@angular/core/testing';

import { MarketService } from './market.service';

describe('MarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketService]
    });
  });

  it('should be created', inject([MarketService], (service: MarketService) => {
    expect(service).toBeTruthy();
  }));
});

import { inject, TestBed } from '@angular/core/testing';

import { MarketReserveBoothService } from './market-reserve-booth.service';

describe('MarketReserveBoothService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketReserveBoothService]
    });
  });

  it(
    'should be created',
    inject([MarketReserveBoothService], (service: MarketReserveBoothService) => {
      expect(service).toBeTruthy();
    })
  );
});

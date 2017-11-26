import { inject, TestBed } from '@angular/core/testing';

import { CreateMarketService } from './create-market.service';

describe('CreateMarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateMarketService]
    });
  });

  it('should be created', inject([CreateMarketService], (service: CreateMarketService) => {
    expect(service).toBeTruthy();
  }));
});

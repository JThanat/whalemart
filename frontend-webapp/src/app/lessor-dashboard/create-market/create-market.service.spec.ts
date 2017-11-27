import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { TimeService } from '../../core/utils/time.service';
import { CreateMarketService } from './create-market.service';

describe('CreateMarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreateMarketService, TimeService]
    });
  });

  it(
    'should be created',
    inject([CreateMarketService], (service: CreateMarketService) => {
      expect(service).toBeTruthy();
    })
  );
});

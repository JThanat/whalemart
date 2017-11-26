import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { MarketService } from '../core/market/market.service';
import { LessorService } from './lessor.service';

describe('LessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LessorService, MarketService]
    });
  });

  it(
    'should be created',
    inject([LessorService], (service: LessorService) => {
      expect(service).toBeTruthy();
    })
  );
});

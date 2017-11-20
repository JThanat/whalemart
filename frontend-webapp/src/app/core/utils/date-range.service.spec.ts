import { inject, TestBed } from '@angular/core/testing';

import { DateRangeService } from './date-range.service';

describe('DateRangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateRangeService]
    });
  });

  it('should be created', inject([DateRangeService], (service: DateRangeService) => {
    expect(service).toBeTruthy();
  }));
});

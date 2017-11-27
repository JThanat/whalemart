import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { BoothsDataResolver } from './booths-data-resolver.service';

describe('BoothsDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoothsDataResolver]
    });
  });

  it(
    'should be created',
    inject([BoothsDataResolver], (service: BoothsDataResolver) => {
      expect(service).toBeTruthy();
    })
  );
});

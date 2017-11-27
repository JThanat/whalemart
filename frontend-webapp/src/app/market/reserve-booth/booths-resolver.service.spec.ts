import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { BoothsResolver } from './booths-resolver.service';

describe('BoothsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoothsResolver]
    });
  });

  it(
    'should be created',
    inject([BoothsResolver], (service: BoothsResolver) => {
      expect(service).toBeTruthy();
    })
  );
});

import { inject, TestBed } from '@angular/core/testing';

import { BoothsResolver } from './booths-resolver.service';

describe('BoothsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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

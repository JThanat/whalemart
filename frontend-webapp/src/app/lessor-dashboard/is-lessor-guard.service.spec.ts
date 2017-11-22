import { TestBed, inject } from '@angular/core/testing';

import { IsLessorGuardService } from './is-lessor-guard.service';

describe('IsLessorGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLessorGuardService]
    });
  });

  it('should be created', inject([IsLessorGuardService], (service: IsLessorGuardService) => {
    expect(service).toBeTruthy();
  }));
});

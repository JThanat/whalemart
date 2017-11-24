import { TestBed, inject } from '@angular/core/testing';

import { LessorService } from './lessor.service';

describe('LessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessorService]
    });
  });

  it('should be created', inject([LessorService], (service: LessorService) => {
    expect(service).toBeTruthy();
  }));
});

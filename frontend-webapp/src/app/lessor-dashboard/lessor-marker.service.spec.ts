import { TestBed, inject } from '@angular/core/testing';

import { LessorMarkerService } from './lessor-marker.service';

describe('LessorMarkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessorMarkerService]
    });
  });

  it('should be created', inject([LessorMarkerService], (service: LessorMarkerService) => {
    expect(service).toBeTruthy();
  }));
});

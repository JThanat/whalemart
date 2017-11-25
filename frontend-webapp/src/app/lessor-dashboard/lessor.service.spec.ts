import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { LessorService } from './lessor.service';

describe('LessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LessorService]
    });
  });

  it('should be created', inject([LessorService], (service: LessorService) => {
    expect(service).toBeTruthy();
  }));
});

import { inject, TestBed } from '@angular/core/testing';

import { SubNavBarService } from './sub-nav-bar.service';

describe('SubNavBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubNavBarService]
    });
  });

  it('should be created', inject([SubNavBarService], (service: SubNavBarService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { FacebookLoginService } from './facebook-login.service';

describe('FacebookLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookLoginService]
    });
  });

  it('should be created', inject([FacebookLoginService], (service: FacebookLoginService) => {
    expect(service).toBeTruthy();
  }));
});

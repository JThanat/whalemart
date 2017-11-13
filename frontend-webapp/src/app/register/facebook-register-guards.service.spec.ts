import { inject, TestBed } from '@angular/core/testing';

import { FacebookRegisterCanActivateGuard } from './facebook-register-guards.service';

describe('FacebookRegisterCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookRegisterCanActivateGuard]
    });
  });

  it('should be created', inject(
    [FacebookRegisterCanActivateGuard],
    (service: FacebookRegisterCanActivateGuard) => {
      expect(service).toBeTruthy();
    }
  ));
});

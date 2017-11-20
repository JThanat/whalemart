import { inject, TestBed } from '@angular/core/testing';

import { IntercomponentDataService } from '../core/utils/intercomponent-data.service';
import { FacebookRegisterCanActivateGuard } from './facebook-register-can-activate-guard.service';

describe('FacebookRegisterCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FacebookRegisterCanActivateGuard,
        IntercomponentDataService
      ]
    });
  });

  it('should be created', inject(
    [FacebookRegisterCanActivateGuard],
    (service: FacebookRegisterCanActivateGuard) => {
      expect(service).toBeTruthy();
    }
  ));
});

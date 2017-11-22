import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UserService } from '../core/user/user.service';
import { FacebookLoginService } from './facebook-login.service';

class MockUserService {
  setLoginData = jasmine.createSpy();
}

describe('FacebookLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FacebookLoginService,
        { provide: UserService, useClass: MockUserService }
      ]
    });
  });

  it('should be created', inject([FacebookLoginService], (service: FacebookLoginService) => {
    expect(service).toBeTruthy();
  }));
});

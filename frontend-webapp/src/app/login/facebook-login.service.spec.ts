import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UserInfo, UserService } from '../core/user/user.service';
import { FacebookLoginService } from './facebook-login.service';

class MockUserService {
  private currentUserInfo: UserInfo | undefined = undefined;
  userInfo = { next: (newUserInfo: UserInfo) => { this.currentUserInfo = newUserInfo; } };

  getCurrentUserInfo() {
    return this.currentUserInfo;
  }
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

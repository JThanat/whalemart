import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UserInfo, UserService } from '../core/user/user.service';
import {
  InvalidLoginCredentialError,
  LoginServerResponse,
  LoginService
} from './login.service';

class MockUserService {
  private currentUserInfo: UserInfo | undefined = undefined;
  userInfo = { next: (newUserInfo: UserInfo) => { this.currentUserInfo = newUserInfo; } };

  getCurrentUserInfo() {
    return this.currentUserInfo;
  }
}

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginService,
        { provide: UserService, useClass: MockUserService }
      ]
    });
  });

  const inj = (fn: (
    loginService: LoginService,
    httpMock: HttpTestingController,
    userService: UserService
  ) => void) => inject([LoginService, HttpTestingController, UserService], fn);

  afterEach(inject(
    [HttpTestingController], (httpMock: HttpTestingController) => httpMock.verify()
  ));

  it('should return UserInfo correctly when the login credential is correct', inj(
    (loginService, httpMock, userService) => {
      expect(userService.getCurrentUserInfo()).toBe(undefined);

      let isSuccess = false;
      loginService.login('test@abc.com', 'testpassword').subscribe(result => {
        expect(result.email).toBe('test@abc.com');
        isSuccess = true;
      });

      const req = httpMock.expectOne({ url: '/api/login-username/', method: 'POST' });
      expect(req.request.body).toEqual({ username: 'test@abc.com', password: 'testpassword' });
      req.flush({
        email: 'test@abc.com',
        first_name: 'Foo',
        last_name: 'Bar'
      } as LoginServerResponse);

      expect(isSuccess).toBe(true);
      expect(userService.getCurrentUserInfo()).toEqual({
        email: 'test@abc.com',
        firstName: 'Foo',
        lastName: 'Bar'
      } as UserInfo);
    }
  ));

  it('should throw LoginError when the login credential is not correct', inj(
    (loginService, httpMock, userService) => {
      expect(userService.getCurrentUserInfo()).toBe(undefined);

      let isError = false;
      loginService.login('test@abc.com', 'testpassword').subscribe(() => fail(), err => {
        expect(err instanceof InvalidLoginCredentialError).toBe(true);
        isError = true;
      });

      const req = httpMock.expectOne({ url: '/api/login-username/', method: 'POST' });
      expect(req.request.body).toEqual({ username: 'test@abc.com', password: 'testpassword' });
      req.flush(null, { status: 400, statusText: 'Bad Request' });

      expect(isError).toBe(true);
      expect(userService.getCurrentUserInfo()).toBeUndefined();
    }
  ));

  it('should throw LoginError when there is an HTTP error', inj(
    (loginService, httpMock, userService) => {
      expect(userService.getCurrentUserInfo()).toBe(undefined);

      let isError = false;
      loginService.login('test@abc.com', 'testpassword').subscribe(() => fail(), err => {
        expect(err instanceof HttpErrorResponse).toBe(true);
        isError = true;
      });

      const req = httpMock.expectOne({ url: '/api/login-username/', method: 'POST' });
      expect(req.request.body).toEqual({ username: 'test@abc.com', password: 'testpassword' });
      req.error(new ErrorEvent('some error'));

      expect(isError).toBe(true);
      expect(userService.getCurrentUserInfo()).toBeUndefined();
    }
  ));
});

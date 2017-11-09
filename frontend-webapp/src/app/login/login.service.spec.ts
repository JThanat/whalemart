import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UserInfo, UserService } from '../core/user/user.service';
import {
  LoginError,
  LoginServerResponse,
  LoginServerResponseError,
  LoginService
} from './login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, UserService]
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
      expect(userService.userInfo.value).toBe(undefined);

      let isSuccess = false;
      loginService.login('test@abc.com', 'testpassword').subscribe(result => {
        expect(result.email).toBe('test@abc.com');
        isSuccess = true;
      });

      const req = httpMock.expectOne({ url: '/api/login/', method: 'POST' });
      expect(req.request.body).toEqual({ email: 'test@abc.com', password: 'testpassword' });
      req.flush({ success: true } as LoginServerResponse);

      expect(isSuccess).toBe(true);
      expect(userService.userInfo.value).not.toBeUndefined();
      const userInfo = userService.userInfo.value as UserInfo;
      expect(userInfo.email).toBe('test@abc.com');
    }
  ));

  it('should throw LoginError when the login credential is not correct', inj(
    (loginService, httpMock, userService) => {
      expect(userService.userInfo.value).toBe(undefined);

      let isError = false;
      loginService.login('test@abc.com', 'testpassword').subscribe(() => fail(), err => {
        if (err instanceof LoginError) {
          expect(err.reason).toBe('INVALID_EMAIL_PASSWORD');
          isError = true;
        } else {
          fail();
        }
      });

      const req = httpMock.expectOne({ url: '/api/login/', method: 'POST' });
      expect(req.request.body).toEqual({ email: 'test@abc.com', password: 'testpassword' });
      req.flush({
        success: false,
        reason: 'INVALID_EMAIL_PASSWORD'
      } as LoginServerResponseError, { status: 401, statusText: 'Unauthorized' });

      expect(isError).toBe(true);
      expect(userService.userInfo.value).toBeUndefined();
    }
  ));

  it('should throw LoginError when there is an HTTP error', inj(
    (loginService, httpMock, userService) => {
      expect(userService.userInfo.value).toBe(undefined);

      let isError = false;
      loginService.login('test@abc.com', 'testpassword').subscribe(() => fail(), err => {
        expect(err instanceof HttpErrorResponse).toBe(true);
        isError = true;
      });

      const req = httpMock.expectOne({ url: '/api/login/', method: 'POST' });
      expect(req.request.body).toEqual({ email: 'test@abc.com', password: 'testpassword' });
      req.error(new ErrorEvent('some error'));

      expect(isError).toBe(true);
      expect(userService.userInfo.value).toBeUndefined();
    }
  ));
});

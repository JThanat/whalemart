import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';

import { UserInfo, UserService } from '../core/user/user.service';
import {
  LoginError,
  LoginServerResponse,
  LoginServerResponseError,
  LoginService
} from './login.service';

fdescribe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, UserService]
    });
  });

  it('should return UserInfo correctly when the login credential is correct', inject(
    [LoginService, UserService],
    (loginService: LoginService, userService: UserService) => {
      // TODO: Use HTTP mocking instead
      spyOn(loginService, 'checkLogin').and.callFake((username: string, password: string) => {
        expect(username).toBe('testusername');
        expect(password).toBe('testpassword');
        const loginServerResponse: LoginServerResponse = { success: true };
        return observableOf(loginServerResponse);
      });

      expect(userService.userInfo.value).toBe(undefined);

      let isSuccess = false;
      loginService.login('testusername', 'testpassword').subscribe(result => {
        expect(result.username).toBe('testusername');
        isSuccess = true;
      });

      expect(isSuccess).toBe(true);
      expect(userService.userInfo.value).not.toBeUndefined();
      const userInfo = userService.userInfo.value as UserInfo;
      expect(userInfo.username).toBe('testusername');
    }
  ));

  it('should throw LoginError when the login credential is not correct', inject(
    [LoginService, UserService],
    (loginService: LoginService, userService: UserService) => {
      // TODO: Use HTTP mocking instead
      spyOn(loginService, 'checkLogin').and.returnValue(observableThrow(new HttpErrorResponse({
        error: {
          success: false,
          reason: 'INVALID_USERNAME_PASSWORD'
        } as LoginServerResponseError
      })));

      expect(userService.userInfo.value).toBe(undefined);

      let isError = false;
      loginService.login('testusername', 'testpassword').subscribe(() => fail(), err => {
        if (err instanceof LoginError) {
          expect(err.reason).toBe('INVALID_USERNAME_PASSWORD');
          isError = true;
        } else {
          fail();
        }
      });

      expect(isError).toBe(true);
      expect(userService.userInfo.value).toBeUndefined();
    }
  ));

  it('should throw LoginError when there is an HTTP error', inject(
    [LoginService, UserService],
    (loginService: LoginService, userService: UserService) => {
      // TODO: Use HTTP mocking instead
      const errorResponse = new HttpErrorResponse({
        error: {},
        status: 0
      });
      spyOn(loginService, 'checkLogin').and.returnValue(observableThrow(errorResponse));

      expect(userService.userInfo.value).toBe(undefined);

      let isError = false;
      loginService.login('testusername', 'testpassword').subscribe(() => fail(), err => {
        expect(err).toBe(errorResponse);
        isError = true;
      });

      expect(isError).toBe(true);
      expect(userService.userInfo.value).toBeUndefined();
    }
  ));
});

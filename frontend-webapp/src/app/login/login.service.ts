import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/materialize';

import { UserInfo, UserService } from '../core/user/user.service';

export interface LoginServerResponse {
  success: true;
}

export type LoginErrorReason = 'INVALID_USERNAME_PASSWORD';

export interface LoginServerResponseError {
  success: false;
  reason: LoginErrorReason;
}

export class LoginError {
  reason: LoginErrorReason | string;

  constructor(reason: LoginErrorReason | string) {
    this.reason = reason;
  }
}

@Injectable()
export class LoginService {
  constructor(private userService: UserService) { }

  login(username: string, password: string): Observable<UserInfo> {
    // TODO: Use real server-side login logic below:
    // return this.http.post<LoginServerResponse>('/api/login/', { username, password })

    return this.checkLogin(username, password)
      .map(result => {
        const userInfo: UserInfo = { username };
        this.userService.userInfo.next(userInfo);
        return userInfo;
      })
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          const errorBody = err.error as LoginServerResponseError;
          if (errorBody.success === false) {
            return observableThrow(new LoginError(errorBody.reason));
          }
        }
        return observableThrow(err);
      });
  }

  // TODO: Remove this function after using real server-side login logic.
  // Exposed public for testing.
  checkLogin(username: string, password: string): Observable<LoginServerResponse> {
    if (username === password) {
      return observableOf({ success: true as true }).delay(1000);
    } else {
      const error = new HttpErrorResponse({
        error: { success: false, reason: 'INVALID_USERNAME_PASSWORD' }
      });
      return observableThrow(error).materialize().delay(1000).dematerialize();
    }
  }
}

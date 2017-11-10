import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

import { UserInfo, UserService } from '../core/user/user.service';

export interface LoginServerResponse {
  token: string;
}

export type LoginErrorReason = 'INVALID_EMAIL_PASSWORD';

export interface LoginServerResponseError {
  non_field_errors: LoginErrorReason[];
}

export class LoginError {
  reason: LoginErrorReason | string;

  constructor(reason: LoginErrorReason | string) {
    this.reason = reason;
  }
}

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private userService: UserService) { }

  login(email: string, password: string): Observable<UserInfo> {
    return this.http
      .post<LoginServerResponse>('/api/api-token-auth/', {
        username: email,
        password
      })
      .pipe(
        map(result => {
          const userInfo: UserInfo = {
            token: result.token,
            email
          };
          this.userService.userInfo.next(userInfo);
          return userInfo;
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const errorBody = err.error as LoginServerResponseError;
            if (Array.isArray(errorBody.non_field_errors)) {
              return observableThrow(new LoginError('INVALID_EMAIL_PASSWORD'));
            }
          }
          return observableThrow(err);
        })
      );
  }
}

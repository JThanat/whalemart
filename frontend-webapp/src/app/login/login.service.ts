import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

import { UserInfo, UserInfoServerResponse, UserService } from '../core/user/user.service';

export type LoginServerResponse = UserInfoServerResponse;

export class InvalidLoginCredentialError { }

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private userService: UserService) { }

  login(email: string, password: string): Observable<UserInfo> {
    return this.http
      .post<LoginServerResponse>('/api/login-username/', {
        username: email,
        password
      })
      .pipe(
        map(result => {
          const userInfo: UserInfo = {
            firstName: result.first_name,
            lastName: result.last_name,
            email: result.email
          };
          this.userService.userInfo.next(userInfo);
          return userInfo;
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              return observableThrow(new InvalidLoginCredentialError());
            }
          }
          return observableThrow(err);
        })
      );
  }
}

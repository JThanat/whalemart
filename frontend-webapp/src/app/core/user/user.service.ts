import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map, mapTo } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 * An immutable interface representing current user state.
 */
export interface UserInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

export interface UserInfoServerResponse {
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable()
export class UserService {
  /**
   * An observable that will emits current UserInfo. If there is no information (logged out), it
   * will return undefined. The first emission will be on initial UserInfo fetching.
   */
  readonly userInfo = new ReplaySubject<UserInfo | undefined>(1);

  constructor(private http: HttpClient) {
    this.getInitialUserInfo().subscribe(userInfo => {
      this.userInfo.next(userInfo);
    });
  }

  getCurrentUserInfo(): UserInfo | undefined {
    let currentUserInfo;
    let isInitialized = false;

    this.userInfo.subscribe(userInfo => {
      currentUserInfo = userInfo;
      isInitialized = true;
    }).unsubscribe();

    if (!isInitialized) {
      throw new Error('Cannot get current UserInfo: userInfo is not available yet');
    }

    return currentUserInfo;
  }

  logout() {
    // This API returns no body, so we have to set to text to prevent JSON parsing.
    return this.http.post('/api/logout/', null, { responseType: 'text' })
      .pipe(mapTo(true));
  }

  private getInitialUserInfo(): Observable<UserInfo | undefined> {
    return this.http.get<UserInfoServerResponse>('/api/current-user/').pipe(
      map(result => {
        return {
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email
        };
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500) {
          return observableOf(undefined);
        }
        return observableThrow(err) as Observable<UserInfo | undefined>;
      })
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, mapTo } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { KeyValueStore } from '../local-db/key-value-store.service';

interface StoredUserInfo {
  readonly email: string;
  readonly token: string;
}

/**
 * An immutable interface representing current user state.
 */
export type UserInfo = StoredUserInfo;

const storedUserInfoKey = 'userInfo';

@Injectable()
export class UserService {
  /**
   * An observable that will emits current UserInfo. If there is no information (logged out), it
   * will return undefined. The first emission will be on initial UserInfo fetching.
   */
  readonly userInfo = new ReplaySubject<UserInfo | undefined>(1);

  constructor(private keyValueStore: KeyValueStore, private http: HttpClient) {
    this.registerUserTokenAutoSaver();
    this.getInitialUserInfo().subscribe(userInfo => {
      this.userInfo.next(userInfo);
    });
  }

  private getInitialUserInfo(): Observable<UserInfo | undefined> {
    const val = this.keyValueStore.get(storedUserInfoKey);
    if (val === undefined) {
      return observableOf(undefined);
    }
    const storedUserInfo = JSON.parse(val) as StoredUserInfo;

    return this.http.post('/api/api-token-verify/', { token: storedUserInfo.token }).pipe(
      mapTo(storedUserInfo),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500) {
          return observableOf(undefined);
        }
        return observableThrow(err) as Observable<UserInfo | undefined>;
      })
    );
  }

  private registerUserTokenAutoSaver() {
    this.userInfo.subscribe(userInfo => {
      if (userInfo === undefined) {
        this.keyValueStore.delete(storedUserInfoKey);
      } else {
        const storedUserInfo: StoredUserInfo = {
          email: userInfo.email,
          token: userInfo.token
        };
        this.keyValueStore.set(storedUserInfoKey, JSON.stringify(storedUserInfo));
      }
    });
  }
}

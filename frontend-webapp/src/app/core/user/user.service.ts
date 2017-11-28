import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, filter, first, map, mapTo, tap } from 'rxjs/operators';

export enum UserStatusType {
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
  Unknown = 'unknown'
}

interface UserStatusLoggedIn {
  type: UserStatusType.LoggedIn;
  user: UserInfo;
}

interface UserStatusNotLoggedIn {
  type: UserStatusType.LoggedOut;
}

interface UserStatusUnknown {
  type: UserStatusType.Unknown;
}

export type KnownUserStatus = UserStatusLoggedIn | UserStatusNotLoggedIn;

/**
 * A type representing an immutable object representing current user state .
 */
export type UserStatus = KnownUserStatus | UserStatusUnknown;

/**
 * An immutable interface representing current user info.
 */
export interface UserInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly isLessor: boolean;
  readonly profileImage: string | null;
}

export interface UserInfoServerResponse {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_lessor: boolean;
  profile_image: string | null;
}

@Injectable()
export class UserService {
  /**
   * An observable that will emits current UserInfo. If there is no information (logged out), it
   * will return undefined. The first emission will be on initial UserInfo fetching.
   */
  private userStatus = new BehaviorSubject<UserStatus>({ type: UserStatusType.Unknown });

  constructor(private http: HttpClient) {
    this.getFreshUserStatusInternally().subscribe(userStatus => {
      this.userStatus.next(userStatus);
    });
  }

  getUserStatus() {
    return this.userStatus.asObservable();
  }

  /**
   * A helper method for getting single known UserStatus, i.e. a UserStatus object with type not
   * equal to `UserStatusType.Unknown`.
   *
   * @returns an observable that emits single known UserStatus.
   */
  getKnownUserStatus(): Observable<KnownUserStatus> {
    return this.userStatus.pipe(filter(this.isUserStatusKnown), first());
  }

  /**
   * Gets a single fresh UserStatus, i.e. a UserStatus data that is always fetched from the API.
   * Note that this method changes `UserService.userStatus`.
   *
   * @returns an observable that emits single known UserStatus.
   */
  getFreshUserStatus() {
    return this.getFreshUserStatusInternally().pipe(
      tap(userStatus => this.userStatus.next(userStatus))
    );
  }

  getCurrentUserStatus() {
    return this.userStatus.value;
  }

  setLoginData(newUserInfo: UserInfo) {
    this.userStatus.next({ type: UserStatusType.LoggedIn, user: newUserInfo });
  }

  logout() {
    // This API returns no body, so we have to set to text to prevent JSON parsing.
    return this.http
      .post('/api/logout/', null, { responseType: 'text' })
      .pipe(tap(() => this.userStatus.next({ type: UserStatusType.LoggedOut })))
      .pipe(mapTo(true));
  }

  private getFreshUserStatusInternally(): Observable<KnownUserStatus> {
    return this.http.get<UserInfoServerResponse>('/api/current-user/').pipe(
      map(result => {
        return {
          type: UserStatusType.LoggedIn as UserStatusType.LoggedIn,
          user: {
            firstName: result.first_name,
            lastName: result.last_name,
            email: result.email,
            phone: result.phone,
            isLessor: result.is_lessor,
            profileImage: result.profile_image
          }
        };
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500) {
          return observableOf({ type: UserStatusType.LoggedOut as UserStatusType.LoggedOut });
        }
        return observableThrow(err) as Observable<KnownUserStatus>;
      })
    );
  }

  private isUserStatusKnown(userStatus: UserStatus): userStatus is KnownUserStatus {
    return userStatus.type !== UserStatusType.Unknown;
  }
}

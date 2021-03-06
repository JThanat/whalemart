/// <reference path="../../../node_modules/@types/facebook-js-sdk/index.d.ts" />

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, filter, first, map, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserInfo, UserInfoServerResponse, UserService } from '../core/user/user.service';
import { IntercomponentDataMap } from '../core/utils/intercomponent-data.service';

let isFbScriptLoadingIssued = false;

interface FacebookLoginResultNoRegistrationNeeded {
  success: true;
  fbAccessToken: string;
  requireRegistration: false;
}

interface FacebookLoginResultRegistrationNeeded {
  success: true;
  fbAccessToken: string;
  requireRegistration: true;
  registrationInfo: IntercomponentDataMap['fbRegister'];
}

type FacebookLoginResult =
  FacebookLoginResultNoRegistrationNeeded |
  FacebookLoginResultRegistrationNeeded;

interface FacebookLoginResultError {
  success: false;
}

export type FacebookLoginServerResponse = UserInfoServerResponse;

@Injectable()
export class FacebookLoginService {
  /**
   * An observable that will be true when the FB script is loaded.
   */
  private isScriptLoaded = new BehaviorSubject(false);

  /**
   * An observable that will fire once with the FB object when the script is already loaded, or when
   * the script loading is finished.
   */
  fbObject = this.isScriptLoaded.pipe(
    filter(isLoaded => isLoaded),
    first(),
    map(() => FB) // Cannot use mapTo operator: FB object might not be available on initial load.
  );

  private isLoginDialogOpening = false;

  constructor(private http: HttpClient, private userService: UserService) { }

  ensureFbScriptLoad() {
    if (isFbScriptLoadingIssued === false) {
      isFbScriptLoadingIssued = true;

      // Following code is adapted from https://developers.facebook.com/docs/javascript/quickstart

      // tslint:disable
      (window as any).fbAsyncInit = () => {
        this.isScriptLoaded.next(true);
        FB.init({
          appId: environment.facebook.appId,
          cookie: true,
          xfbml: true,
          version: 'v2.11'
        });
        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode!.insertBefore(js, fjs);
      }(document, 'script' as 'script', 'facebook-jssdk'));
      // tslint:enable
    }
  }

  loginFacebook(): Observable<FacebookLoginResult | FacebookLoginResultError> {
    if (this.isLoginDialogOpening) {
      throw new Error('Cannot open more than one login dialog simultaneously');
    }
    this.isLoginDialogOpening = true;

    return this.fbObject.pipe(
      mergeMap(fb => new Promise<facebook.AuthResponse>(resolve => {
        fb.login(resolve, { scope: 'public_profile,email' });
      })),
      mergeMap(loginResult => {
        this.isLoginDialogOpening = false;

        if (loginResult.status !== 'connected') {
          return observableOf({ success: false } as FacebookLoginResultError);
        }

        const accessToken = loginResult.authResponse.accessToken;
        return this.getUserDetail(accessToken).pipe(mergeMap(userInfo => {
          if (userInfo) {
            this.userService.setLoginData(userInfo);
            return observableOf({
              success: true,
              fbAccessToken: accessToken,
              requireRegistration: false
            } as FacebookLoginResult);
          } else {
            // Not registered yet.
            const userId = loginResult.authResponse.userID;
            return this.getRegistrationInformation(accessToken, userId).pipe(map(info => {
              return {
                success: true,
                fbAccessToken: accessToken,
                requireRegistration: true,
                registrationInfo: info
              } as FacebookLoginResult;
            }));
          }
        }));
      })
    );
  }

  /**
   * Gets user detail associated with specified with given accessToken.
   *
   * @param accessToken Facebook access token.
   * @returns an observable of UserInfo, or `undefined` if the user has not registered with
   * specified Facebook account.
   */
  private getUserDetail(accessToken: string): Observable<UserInfo | undefined> {
    return this.http.post<FacebookLoginServerResponse>('/api/login-facebook/', {
      facebook_token: accessToken
    }).pipe(
      map(result => {
        const userInfo: UserInfo = {
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email,
          phone: result.phone,
          isLessor: result.is_lessor,
          profileImage: result.profile_image
        };
        return userInfo;
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableOf(false);
          }
        }
        return observableThrow(err);
      })
    );
  }

  getRegistrationInformation(fbAccessToken: string, userId: string)
    : Observable<IntercomponentDataMap['fbRegister']> {
    return this.fbObject.pipe(
      mergeMap(fb => new Promise<{
        first_name: string;
        last_name: string;
        email?: string;
      }>(resolve => {
        fb.api('/me', { fields: 'first_name,last_name,email' }, resolve);
      })),
      map(info => {
        return {
          fbAccessToken,
          firstName: info.first_name,
          lastName: info.last_name,
          email: info.email,
          profileImageUrl: `https://graph.facebook.com/v2.11/${userId}/picture?type=large`
        };
      })
    );
  }
}

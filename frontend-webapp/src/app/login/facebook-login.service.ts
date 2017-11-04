/// <reference path="../../../node_modules/@types/facebook-js-sdk/index.d.ts" />

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, filter, first, map, mapTo, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

let isFbScriptLoadingIssued = false;

interface FacebookLoginResult {
  success: true;
  fbAccessToken: string;
  requireRegistration: boolean;
}

interface FacebookLoginResultError {
  success: false;
}

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

  constructor(private http: HttpClient) { }

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
          version: 'v2.10'
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
      mergeMap(fb => new Promise<facebook.AuthResponse>(resolve => { fb.login(resolve); })),
      mergeMap(loginResult => {
        this.isLoginDialogOpening = false;

        if (loginResult.status !== 'connected') {
          const result: FacebookLoginResultError = { success: false };
          return observableOf(result);
        }

        const accessToken = loginResult.authResponse.accessToken;
        return this.isTokenValid(accessToken).pipe(map(isTokenValid => {
          const result: FacebookLoginResult = {
            success: true,
            fbAccessToken: accessToken,
            requireRegistration: !isTokenValid
          };
          return result;
        }));
      })
    );
  }

  private isTokenValid(accessToken: string) {
    return this.http.post('/api/api-token-verify/', { token: accessToken }).pipe(
      mapTo(true),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableOf(true);
          }
        }
        return observableThrow(err);
      })
    );
  }
}

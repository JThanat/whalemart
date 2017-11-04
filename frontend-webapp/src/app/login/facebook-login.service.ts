/// <reference path="../../../node_modules/@types/facebook-js-sdk/index.d.ts" />

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { filter, first, map, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

let isFbScriptLoadingIssued = false;

interface FacebookLoginResult {
  success: true;
  fbAccessToken: string;
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
   * An observable that will fire once when the script is already loaded, or when the script loading
   * is finished.
   */
  private fbObject = this.isScriptLoaded.pipe(
    filter(isLoaded => isLoaded),
    first(),
    map(() => FB) // Cannot use mapTo operator: FB object might not be available on initial load.
  );

  private isLoginDialogOpening = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ensureFbScriptLoad() {
    if (isFbScriptLoadingIssued === false && isPlatformBrowser(this.platformId)) {
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
      }(this.document, 'script' as 'script', 'facebook-jssdk'));
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
      map(loginResult => {
        this.isLoginDialogOpening = false;
        if (loginResult.status === 'connected') {
          const result: FacebookLoginResult = {
            success: true,
            fbAccessToken: loginResult.authResponse.accessToken
          };
          return result;
        } else {
          const result: FacebookLoginResultError = { success: false };
          return result;
        }
      })
    );
  }
}

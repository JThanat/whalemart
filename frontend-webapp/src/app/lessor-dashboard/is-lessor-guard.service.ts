import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';
import { mapTo } from 'rxjs/operators/mapTo';

@Injectable()
export class IsLessorGuardService  implements CanActivate {

  constructor(
    private http: HttpClient
  ) { }

  canActivate() {
    return this.http.get('/api/lessor/').pipe(
      mapTo(true),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500) {
          return observableOf(false);
        }
        return observableThrow(err);
      })
    );
  }
}

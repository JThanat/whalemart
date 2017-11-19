import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

interface BecomeLessorParams {
  lessorName: string;
  isOrganization: boolean;
  organizationName: string;
  organizationContactName: string;
  organizationEmail: string;
  organizationPhone: string;
}

@Injectable()
export class BecomeLessorService {
  constructor(
    private http: HttpClient
  ) { }

  checkLessorStatus(): Observable<string> {
    return this.http.get('/api/lessor').pipe(
      map(() => 'is_lessor'),
      catchError((err: any): Observable<string> | ErrorObservable => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            return observableOf('is_not_lessor');
          }
        }
        return Observable.throw(err);
      })
    );
  }

  becomeLessor(lessorParams: BecomeLessorParams): Observable<boolean> {
    return this
      .http
      .post('/api/become-lessor', lessorParams)
      .pipe(
        map(() => true)
      );
  }
}

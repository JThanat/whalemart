import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from '../core/user/user.service';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

interface BecomeLessorRequest {
  lessor_name: string;
  is_organization: boolean;
  organization_name: string;
  organization_contact_name: string;
  organization_email: string;
  organization_phone_number: string;
}

export class BecomeLessorError { }
export class CheckLessorError { }

@Injectable()
export class BecomeLessorService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  checkLessorStatus(): Observable<string> {
    if (!this.userService.getCurrentUserInfo()) {
      return observableOf('require_login');
    }
    return this.http.get('/api/lessor.json').pipe(
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

  becomeLessor(lessorParams: BecomeLessorRequest): Observable<boolean> {
    return this
      .http
      .post('/api/become-lessor.json', lessorParams)
      .pipe(
      map(() => true)
      );
  }
}

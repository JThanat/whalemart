import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, mapTo } from 'rxjs/operators';

import { UserService } from '../core/user/user.service';

interface BecomeLessorRequest {
  lessor_name: string;
  is_organization: boolean;
  organization_name: string;
  organization_contact_name: string;
  organization_email: string;
  organization_phone_number: string;
}

type LessorStatus = 'require_login' | 'is_lessor' | 'is_not_lessor';

@Injectable()
export class BecomeLessorService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  checkLessorStatus(): Observable<LessorStatus> {
    if (!this.userService.getCurrentUserInfo()) {
      return observableOf('require_login' as LessorStatus);
    }
    return this.http.get('/api/lessor.json').pipe(
      mapTo('is_lessor'),
      catchError((err: any): Observable<string> | ErrorObservable => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            return observableOf('is_not_lessor');
          }
        }
        return observableThrow(err);
      })
    );
  }

  becomeLessor(lessorParams: BecomeLessorRequest): Observable<boolean> {
    return this.http.post('/api/become-lessor.json', lessorParams).pipe(mapTo(true));
  }
}

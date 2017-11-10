import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

interface RegisterParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

interface RegisterServerResponse {
  success: true;
}

export type RegisterErrorReason = 'INVALID';

interface RegisterServerResponseError {
  success: false;
  reason: RegisterErrorReason;
}

export class RegisterError {
  reason: RegisterErrorReason | string;

  constructor(reason: RegisterErrorReason | string) {
    this.reason = reason;
  }
}

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) { }

  register(params: RegisterParams): Observable<true> {
    return this.http.post<RegisterServerResponse>('/api/users/', {
        email: params.email,
        first_name: params.firstName,
        last_name: params.lastName,
        password: params.password,
        phone: params.phone
    }).pipe(
      map(() => true),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          const errorBody = err.error as RegisterServerResponseError;
          if (errorBody.success === false) {
            return observableThrow(new RegisterError(errorBody.reason));
          }
        }
        return observableThrow(err);
      })
    );
  }
}

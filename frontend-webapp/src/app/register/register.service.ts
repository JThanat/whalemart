import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map, mapTo } from 'rxjs/operators';

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
  readonly emailValidator: AsyncValidatorFn = (formControl: AbstractControl) =>
    this.validateEmail(formControl.value as string).pipe(
      map(isValid => {
        if (isValid) {
          return null;
        }
        return { emailDuplicate: true };
      })
    )

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

  private validateEmail(email: string): Observable<boolean> {
    return this.http.get('/api/users/validate-email/', { params: { email } }).pipe(
      mapTo(true),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500) {
          return observableOf(false);
        }
        return observableThrow(err) as Observable<boolean>;
      })
    );
  }
}

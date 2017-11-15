import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
  is_success: true;
}

export class RegisterError { }

interface EmailValidateServerResponse {
  is_ok: boolean;
}

@Injectable()
export class RegisterService {
  readonly emailValidator = (formControl: AbstractControl) =>
    this.validateEmailDuplication(formControl.value as string).pipe(map(
      isValid => isValid ? null : { emailDuplicate: true }
    ))

  constructor(private http: HttpClient) { }

  register(params: RegisterParams): Observable<true> {
    return this.http.post<RegisterServerResponse>('/api/register/', {
      email: params.email,
      first_name: params.firstName,
      last_name: params.lastName,
      password: params.password,
      phone: params.phone
    }).pipe(
      map(() => true),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new RegisterError());
          }
        }
        return observableThrow(err);
      })
    );
  }

  private validateEmailDuplication(email: string): Observable<boolean> {
    return this.http.get<EmailValidateServerResponse>('/api/validate-email/', {
      params: { email }
    }).pipe(map(result => result.is_ok));
  }
}

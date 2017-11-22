import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, mapTo } from 'rxjs/operators';

interface VendorProfileRequest {
  first_name: string;
  last_name: string;
  phone: string;
}

export class UpdateVendorProfileError { }

@Injectable()
export class VendorProfileService {

  constructor(
    private http: HttpClient
  ) { }

  updateVendorProfile(vendorProfileParams: VendorProfileRequest): Observable<boolean> {
    return this.http.post('/api/current-user', vendorProfileParams).pipe(
      mapTo(true),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new UpdateVendorProfileError());
          }
        }
        return observableThrow(err);
      })
    );
  }
}

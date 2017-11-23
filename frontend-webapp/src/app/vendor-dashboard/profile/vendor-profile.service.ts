import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, mapTo } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';

interface VendorProfileRequest {
  first_name: string;
  last_name: string;
  phone: string;
  profile_image: File;
}

export interface VendorProfileResponse {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile_image: string;
}

export interface VendorProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string;
}

export class VendorProfileError { }

@Injectable()
export class VendorProfileService {

  constructor(
    private http: HttpClient
  ) { }

  updateVendorProfile(vendorProfileParams: VendorProfileRequest): Observable<boolean> {
    const formData = new FormData();
    formData.append('first_name', vendorProfileParams.first_name);
    formData.append('last_name', vendorProfileParams.last_name);
    formData.append('phone', vendorProfileParams.phone);
    formData.append('profile_image', vendorProfileParams.profile_image);
    return this.http.post('/api/current-user/', formData).pipe(
      mapTo(true),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new VendorProfileError());
          }
        }
        return observableThrow(err);
      })
    );
  }

  getVendorProfile() {
    return this.http.get<VendorProfileResponse>('/api/current-user/').pipe(
      map(data => {
        return {
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          profileImage: data.profile_image,
          email: data.email
        };
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new VendorProfileError());
          }
        }
        return observableThrow(err);
      })
    );
  }
}

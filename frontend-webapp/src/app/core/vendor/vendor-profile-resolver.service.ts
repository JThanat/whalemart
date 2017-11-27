import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { VendorProfile, VendorProfileService } from './vendor-profile.service';


@Injectable()
export class VendorProfileResolver implements Resolve<VendorProfile> {
  constructor(private vendorProfileService: VendorProfileService) {}

  resolve(): Observable<VendorProfile>  {
    return this.vendorProfileService.vendorProfile$;
  }
}

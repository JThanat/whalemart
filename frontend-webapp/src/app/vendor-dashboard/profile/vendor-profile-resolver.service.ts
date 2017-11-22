import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { VendorProfileResponse, VendorProfileService } from './vendor-profile.service';

@Injectable()
export class VendorProfileResolver implements Resolve<VendorProfileResponse> {
  constructor(private vendorProfileService: VendorProfileService) {}

  resolve(): Observable<VendorProfileResponse>  {
    return this.vendorProfileService.getVendorProfile();
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CreditCard, VendorPaymentService } from './vendor-payment.service';

@Injectable()
export class VendorPaymentResolver implements Resolve<CreditCard> {
  constructor(private vendorPaymentService: VendorPaymentService) {}

  resolve(): Observable<CreditCard>  {
    return this.vendorPaymentService.getCreditCards$;
  }
}

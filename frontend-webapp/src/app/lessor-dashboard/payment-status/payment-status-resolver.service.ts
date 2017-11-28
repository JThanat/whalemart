import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

import { MarketPaymentStatus } from './payment-status.component';

interface MarketPaymentStatusResponse {
  booth_id: number;
  booth_number: string;
  payment_status: number;
  vendor_id: null | number;
  vendor_name: null | string;
}

@Injectable()
export class PaymentStatusResolver implements Resolve<MarketPaymentStatus[]> {
  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot) {
    const marketId = route.paramMap.get('id');
    if (marketId === null) {
      throw new Error('Market ID should not be null');
    }
    return this.http.get<MarketPaymentStatusResponse[]>(`/api/payment-status/${marketId}/`).pipe(
      map(data => data.map(payment => ({
        boothId: payment.booth_id,
        boothNumber: payment.booth_number,
        paymentStatus: payment.payment_status,
        vendorId: payment.vendor_id,
        vendorName: payment.vendor_name
      }))));
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export interface MarketPaymentStatus {
  boothId: number;
  boothNumber: string;
  paymentStatus: number;
  vendorId: null | number;
  vendorName: null | string;
}

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  marketPaymentStatus$: Observable<MarketPaymentStatus[]>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.marketPaymentStatus$ = this.route.data.pipe(map(data => data.paymentStatus));
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MarketPaymentStatus, PaymentStatusService } from './payment-status.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  marketPaymentStatus$: Observable<MarketPaymentStatus[]>;

  constructor(private paymentStatusService: PaymentStatusService) { }

  ngOnInit() {
    this.marketPaymentStatus$ = this.paymentStatusService.getMarketPaymentStatus();
  }

}

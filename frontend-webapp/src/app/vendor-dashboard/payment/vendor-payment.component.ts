import { Component, OnInit } from '@angular/core';
import { CreditCard, VendorPaymentService } from './vendor-payment.service';

@Component({
  selector: 'app-vendor-payment',
  templateUrl: './vendor-payment.component.html',
  styleUrls: ['./vendor-payment.component.scss']
})
export class VendorPaymentComponent implements OnInit {
  creditCards: CreditCard;

  constructor(
    private vendorPaymentService: VendorPaymentService
  ) { }

  ngOnInit() {
    this.vendorPaymentService.getCreditCards$.subscribe(data => this.creditCards = data);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CreditCard,
  CreditCardRequest,
  VendorPaymentService
} from './vendor-payment.service';

@Component({
  selector: 'app-vendor-payment',
  templateUrl: './vendor-payment.component.html',
  styleUrls: ['./vendor-payment.component.scss']
})
export class VendorPaymentComponent implements OnInit {
  creditCards: CreditCard[];
  addCreditCardForm: FormGroup;
  isShowAddCreditCard = false;

  constructor(
    private vendorPaymentService: VendorPaymentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.creditCards = data.creditCards;
    });

    this.addCreditCardForm = new FormGroup(
      {
        cardNumber: new FormControl('', [Validators.required]),
        cardHolderName: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        expiryDate: new FormControl(null, [Validators.required]),
        verificationNumber: new FormControl(null, [Validators.required])
      },
      { updateOn: 'blur' }
    );
  }

  showAddCreditCard() {
    this.isShowAddCreditCard = true;
  }

  addCreditCard(creditCard: CreditCard) {
    // TODO: Change expiry_date to input from date picker
    const creditCardReq: CreditCardRequest = {
      card_number: creditCard.cardNumber,
      card_holder_name: creditCard.cardHolderName,
      type: creditCard.type === 'master' ? 1 : 2,
      expiry_date: new Date().toISOString().substring(0, 10),
      verification_no: creditCard.verificationNo
    };
    this.vendorPaymentService.addCreditCard$(creditCardReq).subscribe(data => {
      this.creditCards = data;
    });
  }

  deleteCreditCard(creditCard: CreditCard) {
    if (confirm(`Are you sure to delete card ${creditCard.cardNumber}`)) {
      this.vendorPaymentService
        .deleteCreditCard$(creditCard.id)
        .subscribe(data => {
          this.creditCards = data;
        });
    }
  }
}

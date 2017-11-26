import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditCard } from './vendor-payment.service';

@Component({
  selector: 'app-vendor-payment',
  templateUrl: './vendor-payment.component.html',
  styleUrls: ['./vendor-payment.component.scss']
})
export class VendorPaymentComponent implements OnInit {
  creditCards: CreditCard;
  addCreditCardForm: FormGroup;
  isShowAddCreditCard = false;

  constructor(
    private route: ActivatedRoute
  ) { }

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

  addCreditCard() {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/alert/alert.service';
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
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.creditCards = data.creditCards;
    });

    this.addCreditCardForm = new FormGroup(
      {
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{16}$/)
        ]),
        cardHolderName: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        expiryDate: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{2}\/\d{2}$/)
        ]),
        verificationNo: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d{3}$/)
        ])
      },
      { updateOn: 'blur' }
    );
  }

  showAddCreditCard() {
    this.isShowAddCreditCard = true;
  }

  addCreditCard() {
    if (!this.addCreditCardForm.valid) {
      return;
    }

    this.addCreditCardForm.disable();

    const creditCard = this.addCreditCardForm.value;
    const [expiryMonth, expiryYear] = creditCard.expiryDate.split('/', 2);
    const creditCardReq: CreditCardRequest = {
      card_number: creditCard.cardNumber,
      card_holder_name: creditCard.cardHolderName,
      type: creditCard.type === 'master' ? 1 : 2,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
      verification_no: creditCard.verificationNo
    };
    console.log(creditCard, creditCardReq);
    this.vendorPaymentService.addCreditCard$(creditCardReq).subscribe(
      data => {
        this.addCreditCardForm.enable();
        this.creditCards = data;
      },
      err => {
        this.addCreditCardForm.enable();
        this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
      }
    );
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

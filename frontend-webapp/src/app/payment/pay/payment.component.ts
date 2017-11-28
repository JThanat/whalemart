/// <reference path="./cleave.d.ts" />

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
// import * as Cleave from 'cleave.js';
import { AlertService } from '../../core/alert/alert.service';

type InstallmentType = 30 | 100;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  chooseInstallmentTypeForm: FormGroup;
  choosePaymentMethodForm: FormGroup;
  creditCardForm: FormGroup;
  isBank = false;

  marketID: number;
  installment: InstallmentType = 30;

  @ViewChild('cardNumber') cardNumber: ElementRef;
  @ViewChild('expiryDate') expiryDate: ElementRef;
  @ViewChild('verificationNo') verificationNo: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.marketID = params['marketID'];
      console.log(this.marketID);
    });

    this.chooseInstallmentTypeForm = new FormGroup(
      {
        type: new FormControl('30', [Validators.required])
      },
      { updateOn: 'blur' }
    );

    this.choosePaymentMethodForm = new FormGroup(
      {
        method: new FormControl('credit', [Validators.required])
      },
      { updateOn: 'blur' }
    );

    this.creditCardForm = new FormGroup({
      cardHolderName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}\d{4}\d{4}\d{4}$/)
      ]),
      type: new FormControl('visa', [Validators.required]),
      expiryDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{2}\/\d{2}$/)
      ]),
      verificationNo: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{3}$/)
      ]),
      isSaved: new FormControl(false)
    });
  }

  updateInstallmentType(event: any) {
    console.log(event);
    this.installment = event.target.value;
    console.log(this.installment);
  }

  updateBank(event: any) {
    console.log(event);
    this.isBank = event.target.value === 'bank-transfer';
    console.log(this.isBank);
  }

  submitForm() {
    if (!this.isBank && !this.creditCardForm.valid) {
      console.log(this.creditCardForm.errors);
      return;
    }

    const {
      cardHolderName,
      cardNumber,
      expiryDate,
      verificationNo,
      isSaved
    } = this.creditCardForm.value;

    const cardNumberClean = cardNumber.split(' ').join('');
    const [expireMonth, expireYear] = expiryDate.split('/');

    const obj: any = {
      payment_type: this.installment === 30 ? 1 : 2,
      market: this.marketID,
      new_credit_card: {
        card_number: cardNumberClean,
        card_holder_name: cardHolderName,
        type: 1,
        expiry_month: expireMonth,
        expiry_year: expireYear,
        verification_no: verificationNo
      },
      save_new_credit_card: isSaved,
      payment_method: this.isBank ? 2 : 1,
      amount: 360
    };

    if (this.isBank) {
      delete obj['new_credit_card'];
    }

    this.http
      .post('/api/payment/', obj)
      .subscribe(data =>
        this.alert.show({ message: 'ลงทะเบียนการ์ดสำเร็จ', type: 'success' })
      );
  }

  ngAfterViewInit() {
    /* tslint:disable:no-unused-expression */
    // new Cleave(this.cardNumber.nativeElement, {
    //   creditCard: true
    // });
    // new Cleave(this.expiryDate.nativeElement, {
    //   date: true,
    //   datePattern: ['m', 'y']
    // });
    // new Cleave(this.verificationNo.nativeElement, {
    //   blocks: [3],
    //   numericOnly: true
    // });
    /* tslint:enable:no-unused-expression */
  }
}

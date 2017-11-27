import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as Cleave from 'cleave.js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  chooseInstallmentTypeForm: FormGroup;
  choosePaymentMethodForm: FormGroup;
  creditCardForm: FormGroup;

  @ViewChild('cardNumber', {read: ElementRef}) cardNumber: ElementRef;
  @ViewChild('expiryDate', {read: ElementRef}) expiryDate: ElementRef;
  @ViewChild('verificationNo', {read: ElementRef}) verificationNo: ElementRef;

  constructor() { }

  ngOnInit() {
    this.chooseInstallmentTypeForm = new FormGroup({
      type: new FormControl('30', [Validators.required])
    }, { updateOn: 'blur' });

    this.choosePaymentMethodForm = new FormGroup({
      method: new FormControl('credit', [Validators.required])
    }, { updateOn: 'blur' });

    this.creditCardForm = new FormGroup(
      {
        cardHolderName: new FormControl('', [Validators.required]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)
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
      },
      { updateOn: 'blur' }
    );
  }

  ngAfterViewInit() {
    /* tslint:disable:no-unused-expression */
    new Cleave(this.cardNumber.nativeElement, {
      creditCard: true
    });

    new Cleave(this.expiryDate.nativeElement, {
      date: true,
      datePattern: ['m', 'y']
    });

    new Cleave(this.verificationNo.nativeElement, {
      blocks: [3],
      numericOnly: true
    });
    /* tslint:enable:no-unused-expression */
  }

}

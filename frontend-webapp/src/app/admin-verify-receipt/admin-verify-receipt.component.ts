import { Component, OnInit } from '@angular/core';
import { Receipt, ReceiptService } from './receipt.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-verify-receipt',
  templateUrl: './admin-verify-receipt.component.html',
  styleUrls: ['./admin-verify-receipt.component.scss']
})
export class AdminVerifyReceiptComponent implements OnInit {
  receipt1: Receipt = {
    id: 1234,
    payment_date: '2017-02-02',
    receipt_image:
      'https://acme.invoicehome.com/assets/invoice_templates/en/receipt/88-74f61a66097977e2774417863164fe2dafe5e22e94787c4bc01063ece78f7bc4.png',
    amount: 1234,
    verification_status: 1
  };
  receipt2: Receipt = {
    id: 1234,
    payment_date: '2017-02-02',
    receipt_image:
      'https://acme.invoicehome.com/assets/invoice_templates/en/receipt/88-74f61a66097977e2774417863164fe2dafe5e22e94787c4bc01063ece78f7bc4.png',
    amount: 1234,
    verification_status: 1
  };
 

  receipts$: Observable < Receipt[]>;
  // = [
  //   this.receipt1,
  //   this.receipt2,
  //   {
  //     id: '1234',
  //     date: new Date(),
  //     profileImage:
  //     'http://www.makereceipts.com/receipt_preview.jpg',
  //     amount: 1234
  //   }
  // ];

  constructor(private receiptService: ReceiptService) { }


  ngOnInit() {
    this.receipts$ = this.receiptService.getReceiptList()
    // .subscribe(data => {
    //   this.receipts$ = data;
    // });
  }

}

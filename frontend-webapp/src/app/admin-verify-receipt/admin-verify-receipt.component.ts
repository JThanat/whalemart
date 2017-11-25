import { Component, OnInit } from '@angular/core';

class Receipt {
  id: string;
  date: Date;
  profileImage: string;
  amount: number;
}


@Component({
  selector: 'app-admin-verify-receipt',
  templateUrl: './admin-verify-receipt.component.html',
  styleUrls: ['./admin-verify-receipt.component.scss']
})
export class AdminVerifyReceiptComponent implements OnInit {
  receipt1: Receipt = {
    id: '1234',
    date: new Date(),
    profileImage:
      'https://acme.invoicehome.com/assets/invoice_templates/en/receipt/88-74f61a66097977e2774417863164fe2dafe5e22e94787c4bc01063ece78f7bc4.png',
    amount: 1234
  };

  receipt2: Receipt = {
    id: '1234',
    date: new Date(),
    profileImage: 'https://discourse-cdn-sjc1.com/business2/uploads/manager1/original/2X/7/71bfea85ebeba2ed4409a76cb38b8f3336847440.png',
    amount: 1234
  };

  receipts: Receipt[] = [
    this.receipt1,
    this.receipt2,
    {
      id: '1234',
      date: new Date(),
      profileImage:
      'http://www.makereceipts.com/receipt_preview.jpg',
      amount: 1234
    };
  ];

  constructor() { }

  ngOnInit() {
  }

}

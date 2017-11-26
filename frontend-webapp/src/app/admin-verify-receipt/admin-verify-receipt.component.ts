import { Component, OnInit } from '@angular/core';
import { Receipt, ReceiptService } from './receipt.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-verify-receipt',
  templateUrl: './admin-verify-receipt.component.html',
  styleUrls: ['./admin-verify-receipt.component.scss']
})
export class AdminVerifyReceiptComponent implements OnInit {

  receipts$: Receipt[];

  constructor(private receiptService: ReceiptService) { }


  ngOnInit() {
    this.receiptService.getReceiptList().subscribe(data =>{
      this.receipts$ = data;
    });

  }
  removeReceipt(){

  }

}

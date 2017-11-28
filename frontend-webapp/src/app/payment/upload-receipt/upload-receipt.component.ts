import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss']
})
export class UploadReceiptComponent implements OnInit {
  receiptForm: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
    });

    this.receiptForm = new FormGroup({
      image: new FormControl()
    });
  }

  uploadReceipt() {
    if (!this.receiptForm.valid) {
      return;
    }

    // const { image } = this.receiptForm.value;
    // const formData = FormData();

  }
}

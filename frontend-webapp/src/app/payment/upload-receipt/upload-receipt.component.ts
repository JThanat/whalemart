import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/alert/alert.service';

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss']
})
export class UploadReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
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

    const { image } = this.receiptForm.value;

    console.log(image);

    const formData = new FormData();
    formData.append('payment_date', '2017-11-28');
    formData.append('receipt_image', image[0]);

    this.http.patch('/api/upload-receipt/' + this.id + '/#', formData).subscribe(
      data => this.alert.show({ type: 'success', message: 'อัพโหลดสำเร็จ' })
    );

    // const { image } = this.receiptForm.value;
    // const formData = FormData();

  }
}

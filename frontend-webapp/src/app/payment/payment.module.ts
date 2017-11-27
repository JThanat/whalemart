import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [PaymentComponent, UploadReceiptComponent]
})
export class PaymentModule { }

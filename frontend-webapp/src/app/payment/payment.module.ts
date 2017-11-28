import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './pay/payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [PaymentComponent, UploadReceiptComponent]
})
export class PaymentModule { }

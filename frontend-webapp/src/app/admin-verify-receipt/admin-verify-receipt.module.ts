import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminVerifyReceiptComponent } from './admin-verify-receipt.component';
import { AdminVerifyReceiptRoutingModule } from './admin-verify-receipt-routing.module';


@NgModule({
  imports: [
    SharedModule,
    AdminVerifyReceiptRoutingModule
  ],
  declarations: [AdminVerifyReceiptComponent]
})
export class AdminVerifyReceiptModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminVerifyReceiptRoutingModule } from './admin-verify-receipt-routing.module';
import { AdminVerifyReceiptComponent } from './admin-verify-receipt.component';
import { ReceiptService } from './receipt.service';


@NgModule({
  imports: [
    SharedModule,
    AdminVerifyReceiptRoutingModule
  ],
  declarations: [AdminVerifyReceiptComponent],
  providers: [ReceiptService]
})
export class AdminVerifyReceiptModule { }

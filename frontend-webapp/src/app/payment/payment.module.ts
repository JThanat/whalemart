import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }

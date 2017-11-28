import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from './pay/payment.component';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'receipt/:id',
        pathMatch: 'full',
        component: UploadReceiptComponent
      },
      {
        path: 'pay/:marketID',
        pathMatch: 'full',
        component: PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

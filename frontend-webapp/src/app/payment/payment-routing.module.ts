import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'receipt/:id',
        pathMatch: 'full',
        component: UploadReceiptComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

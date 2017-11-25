import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVerifyReceiptComponent } from './admin-verify-receipt.component';


const routes: Routes = [
  {
    path: '',
    component: AdminVerifyReceiptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminVerifyReceiptRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminVerifyReceiptComponent } from './admin-verify-receipt/admin-verify-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'verify-receipt'
      },
      {
        path: 'verify-receipt',
        component: AdminVerifyReceiptComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminDashboardRoutingModule {}

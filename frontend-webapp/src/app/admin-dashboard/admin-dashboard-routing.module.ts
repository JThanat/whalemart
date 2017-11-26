import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminVerifyReceiptComponent } from './admin-verify-receipt/admin-verify-receipt.component';
import { ReportComponent } from './report/report.component';

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
      },
      {
        path: 'report',
        component: ReportComponent
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

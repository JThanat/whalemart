import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminVerifyReceiptComponent } from './admin-verify-receipt/admin-verify-receipt.component';
import { ReceiptService } from './admin-verify-receipt/receipt.service';
import { ReportComponent } from './report/report.component';

@NgModule({
  imports: [
    SharedModule,
    AdminDashboardRoutingModule
  ],
  providers: [ReceiptService],
  declarations: [AdminDashboardComponent, AdminVerifyReceiptComponent, ReportComponent]
})
export class AdminDashboardModule { }
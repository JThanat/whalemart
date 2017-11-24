import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LessorDashboardRoutingModule } from './lessor-dashboard-routing.module';
import { LessorDashboardComponent } from './lessor-dashboard.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorManageMarketComponent } from './lessor-manage-market/lessor-manage-market.component';

@NgModule({
  imports: [
    SharedModule,
    LessorDashboardRoutingModule
  ],
  declarations: [LessorDashboardComponent, LessorInfoComponent, LessorManageMarketComponent]
})
export class LessorDashboardModule { }

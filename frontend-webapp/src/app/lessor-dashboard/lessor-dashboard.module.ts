import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LessorDashboardRoutingModule } from './lessor-dashboard-routing.module';
import { LessorDashboardComponent } from './lessor-dashboard.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorService } from './lessor.service';
import { LessorManageMarketComponent } from './manage-market/lessor-manage-market.component';
import { LessorMarketResolverService } from './manage-market/lessor-market-resolver.service';

@NgModule({
  imports: [SharedModule, LessorDashboardRoutingModule],
  declarations: [LessorDashboardComponent, LessorInfoComponent, LessorManageMarketComponent],
  providers: [LessorService, LessorMarketResolverService]
})
export class LessorDashboardModule {}

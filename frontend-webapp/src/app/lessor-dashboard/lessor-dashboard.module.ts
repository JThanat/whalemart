import { NgModule } from '@angular/core';

import { VendorProfileResolver } from '../core/vendor/vendor-profile-resolver.service';
import { VendorProfileService } from '../core/vendor/vendor-profile.service';
import { SharedModule } from '../shared/shared.module';
import { CreateMarketComponent } from './create-market/create-market.component';
import { CreateMarketService } from './create-market/create-market.service';
import { LessorDashboardRoutingModule } from './lessor-dashboard-routing.module';
import { LessorDashboardComponent } from './lessor-dashboard.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorService } from './lessor.service';
import { LessorManageMarketComponent } from './manage-market/lessor-manage-market.component';
import { LessorMarketResolverService } from './manage-market/lessor-market-resolver.service';

@NgModule({
  imports: [SharedModule, LessorDashboardRoutingModule],
  declarations: [
    LessorDashboardComponent,
    LessorInfoComponent,
    LessorManageMarketComponent,
    CreateMarketComponent
  ],
  providers: [
    LessorService,
    LessorMarketResolverService,
    CreateMarketService,
    VendorProfileResolver,
    VendorProfileService
  ]
})
export class LessorDashboardModule {}

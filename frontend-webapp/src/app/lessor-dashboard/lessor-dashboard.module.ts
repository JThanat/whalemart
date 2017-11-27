import { NgModule } from '@angular/core';

import { LessorService } from '../core/lessor/lessor.service';
import { VendorProfileResolver } from '../core/vendor/vendor-profile-resolver.service';
import { VendorProfileService } from '../core/vendor/vendor-profile.service';
import { SharedModule } from '../shared/shared.module';
import { UserProductService } from '../shared/user/user-product/user-product.service';
import { CreateMarketComponent } from './create-market/create-market.component';
import { CreateMarketService } from './create-market/create-market.service';
import { LessorDashboardRoutingModule } from './lessor-dashboard-routing.module';
import { LessorDashboardComponent } from './lessor-dashboard.component';
import { LessorInfoComponent } from './lessor-info/lessor-info.component';
import { LessorManageMarketComponent } from './manage-market/lessor-manage-market.component';
import { LessorMarketResolverService } from './manage-market/lessor-market-resolver.service';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

@NgModule({
  imports: [SharedModule, LessorDashboardRoutingModule],
  declarations: [
    LessorDashboardComponent,
    LessorInfoComponent,
    LessorManageMarketComponent,
    CreateMarketComponent,
    PaymentStatusComponent
  ],
  providers: [
    LessorService,
    LessorMarketResolverService,
    CreateMarketService,
    VendorProfileResolver,
    VendorProfileService,
    UserProductService
  ]
})
export class LessorDashboardModule {}

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VendorProductComponent } from './product/vendor-product.component';
import { VendorProfileResolver } from './profile/vendor-profile-resolver.service';
import { VendorProfileComponent } from './profile/vendor-profile.component';
import { VendorProfileService } from './profile/vendor-profile.service';
import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';
import { VendorDashboardComponent } from './vendor-dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    VendorDashboardRoutingModule
  ],
  declarations: [
    VendorProfileComponent,
    VendorDashboardComponent,
    VendorProductComponent
  ],
  providers: [
    VendorProfileService,
    VendorProfileResolver
  ]
})
export class VendorDashboardModule { }

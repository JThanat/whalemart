import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VendorProfileComponent } from './profile/vendor-profile.component';
import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';

@NgModule({
  imports: [
    SharedModule,
    VendorDashboardRoutingModule
  ],
  declarations: [VendorProfileComponent]
})
export class VendorDashboardModule { }

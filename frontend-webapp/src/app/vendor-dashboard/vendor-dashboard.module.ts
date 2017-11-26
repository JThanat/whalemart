import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VendorPaymentResolver } from './payment/vendor-payment-resolver.service';
import { VendorPaymentComponent } from './payment/vendor-payment.component';
import { VendorPaymentService } from './payment/vendor-payment.service';
import { VendorProductComponent } from './product/vendor-product.component';
import { VendorProductService } from './product/vendor-product.service';
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
    VendorProductComponent,
    VendorPaymentComponent
  ],
  providers: [
    VendorProfileService,
    VendorPaymentResolver,
    VendorProfileResolver,
    VendorProductService,
    VendorPaymentService
  ]
})
export class VendorDashboardModule { }

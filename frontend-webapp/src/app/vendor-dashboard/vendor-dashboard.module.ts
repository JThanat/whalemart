import { NgModule } from '@angular/core';

import { LessorService } from '../core/lessor/lessor.service';
import { VendorProfileResolver } from '../core/vendor/vendor-profile-resolver.service';
import { VendorProfileService } from '../core/vendor/vendor-profile.service';
import { SharedModule } from '../shared/shared.module';
import { UserProductService } from '../shared/user/user-product/user-product.service';
import { VendorPaymentResolver } from './payment/vendor-payment-resolver.service';
import { VendorPaymentComponent } from './payment/vendor-payment.component';
import { VendorPaymentService } from './payment/vendor-payment.service';
import { VendorProfileComponent } from './profile/vendor-profile.component';
import { VendorReservationComponent } from './reservation/vendor-reservation.component';
import { VendorReservationService } from './reservation/vendor-reservation.service';
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
    VendorPaymentComponent,
    VendorReservationComponent
  ],
  providers: [
    VendorProfileService,
    VendorPaymentResolver,
    VendorProfileResolver,
    VendorReservationService,
    UserProductService,
    VendorPaymentService,
    LessorService
  ]
})
export class VendorDashboardModule { }

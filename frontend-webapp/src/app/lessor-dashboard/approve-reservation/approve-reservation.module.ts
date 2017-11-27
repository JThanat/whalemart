import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ApproveReservationRoutingModule } from './approve-reservation-routing.module';
import { ApproveReservationComponent } from './approve-reservation.component';
import { BoothsDataResolver } from './booths-data-resolver.service';
import { VendorComponent } from './vendor/vendor.component';

@NgModule({
  imports: [SharedModule, ApproveReservationRoutingModule],
  declarations: [ApproveReservationComponent, VendorComponent],
  providers: [BoothsDataResolver]
})
export class ApproveReservationModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApproveReservationComponent } from './approve-reservation.component';
import { BoothsDataResolver } from './booths-data-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: ApproveReservationComponent,
    resolve: {
      boothsData: BoothsDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveReservationRoutingModule {}

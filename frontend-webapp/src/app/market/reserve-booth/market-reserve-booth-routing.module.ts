import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketReserveBoothComponent } from './market-reserve-booth.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarketReserveBoothComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketReserveBoothRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketDetailResolver } from './market-detail-resolver.service';
import { MarketLandingComponent } from './market-landing.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarketLandingComponent,
    resolve: {
      marketDetail: MarketDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketLandingRoutingModule { }

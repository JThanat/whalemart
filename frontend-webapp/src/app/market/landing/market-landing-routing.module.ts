import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketDetailResolver } from './market-detail-resolver.service';
import { MarketLandingComponent } from './market-landing.component';
import { SimilarMarketsResolver } from './similar-markets-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarketLandingComponent,
    resolve: {
      marketDetail: MarketDetailResolver,
      similarMarkets: SimilarMarketsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketLandingRoutingModule { }

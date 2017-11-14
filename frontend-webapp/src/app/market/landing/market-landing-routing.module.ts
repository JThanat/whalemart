import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketLandingComponent } from './market-landing.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarketLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketLandingRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketLandingRoutingModule } from './market-landing-routing.module';
import { MarketLandingComponent } from './market-landing.component';

@NgModule({
  imports: [
    CommonModule,
    MarketLandingRoutingModule
  ],
  declarations: [MarketLandingComponent]
})
export class MarketLandingModule { }

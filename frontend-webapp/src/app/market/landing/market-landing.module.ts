import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { MarketLandingRoutingModule } from './market-landing-routing.module';
import { MarketLandingComponent } from './market-landing.component';

@NgModule({
  imports: [
    SharedModule,
    MarketLandingRoutingModule
  ],
  declarations: [MarketLandingComponent]
})
export class MarketLandingModule { }

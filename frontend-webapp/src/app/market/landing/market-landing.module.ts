import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MarketDetailResolver } from './market-detail-resolver.service';
import { MarketLandingRoutingModule } from './market-landing-routing.module';
import { MarketLandingComponent } from './market-landing.component';
import { SceneCarouselComponent } from './scene-carousel.component';
import { SimilarMarketsResolver } from './similar-markets-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    MarketLandingRoutingModule,
    ScrollDispatchModule
  ],
  declarations: [
    MarketLandingComponent,
    SceneCarouselComponent
  ],
  providers: [
    MarketDetailResolver,
    SimilarMarketsResolver
  ]
})
export class MarketLandingModule { }

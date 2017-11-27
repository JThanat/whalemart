import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
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
    SimilarMarketsResolver
  ]
})
export class MarketLandingModule { }

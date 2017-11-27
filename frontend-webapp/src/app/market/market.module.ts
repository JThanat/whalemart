import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MarketDetailResolver } from './market-detail-resolver.service';
import { MarketRoutingModule } from './market-routing.module';

@NgModule({
  imports: [SharedModule, MarketRoutingModule],
  declarations: [],
  providers: [MarketDetailResolver]
})
export class MarketModule {}

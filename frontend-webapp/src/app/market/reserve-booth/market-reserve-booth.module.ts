import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MarketReserveBoothRoutingModule } from './market-reserve-booth-routing.module';
import { MarketReserveBoothComponent } from './market-reserve-booth.component';

@NgModule({
  imports: [
    SharedModule,
    MarketReserveBoothRoutingModule
  ],
  declarations: [MarketReserveBoothComponent]
})
export class MarketReserveBoothModule { }

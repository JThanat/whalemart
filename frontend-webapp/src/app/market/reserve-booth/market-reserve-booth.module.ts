import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BoothsResolver } from './booths-resolver.service';
import { MarketReserveBoothRoutingModule } from './market-reserve-booth-routing.module';
import { MarketReserveBoothComponent } from './market-reserve-booth.component';
import { MarketReserveBoothService } from './market-reserve-booth.service';
import { ProductsResolver } from './products-resolver.service';

@NgModule({
  imports: [SharedModule, MarketReserveBoothRoutingModule],
  declarations: [MarketReserveBoothComponent],
  providers: [MarketReserveBoothService, BoothsResolver, ProductsResolver]
})
export class MarketReserveBoothModule {}

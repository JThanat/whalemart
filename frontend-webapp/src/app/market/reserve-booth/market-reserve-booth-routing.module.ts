import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoothsResolver } from './booths-resolver.service';
import { MarketReserveBoothComponent } from './market-reserve-booth.component';
import { ProductsResolver } from './products-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarketReserveBoothComponent,
    resolve: {
      booths: BoothsResolver,
      products: ProductsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketReserveBoothRoutingModule {}

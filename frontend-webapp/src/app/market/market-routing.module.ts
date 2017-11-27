import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginGuard } from '../core/user/user-login-guard';
import { MarketDetailResolver } from './market-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: {
      marketDetail: MarketDetailResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: './landing/market-landing.module#MarketLandingModule'
      },
      {
        path: 'reserve',
        canActivate: [UserLoginGuard],
        loadChildren: './reserve-booth/market-reserve-booth.module#MarketReserveBoothModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule {}

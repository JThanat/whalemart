import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './feed/feed.module#FeedModule'
  },
  {
    path: 'admin-verify',
    loadChildren: './admin-verify-receipt/admin-verify-receipt.module#AdminVerifyReceiptModule'
  },
  {
    path: 'ping',
    loadChildren: './ping/ping.module#PingModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: 'become-lessor',
    loadChildren: './become-lessor/become-lessor.module#BecomeLessorModule'
  },
  {
    path: 'market/:id',
    loadChildren: './market/landing/market-landing.module#MarketLandingModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'vendor',
    loadChildren: './vendor-dashboard/vendor-dashboard.module#VendorDashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

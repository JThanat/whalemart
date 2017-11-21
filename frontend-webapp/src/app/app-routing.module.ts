import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './feed/feed.module#FeedModule'
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
    path: 'market/:id',
    pathMatch: 'full',
    loadChildren: './market/landing/market-landing.module#MarketLandingModule'
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'vendor-profile',
    pathMatch: 'full',
    loadChildren: './vendor-profile/vendor-profile.module#VendorProfileModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
